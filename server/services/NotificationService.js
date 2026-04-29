import nodemailer from "nodemailer";
import { Notification, User } from "../models/index.js";

class NotificationService {
  constructor() {
    this.io = null;
    this.connectedUsers = new Map(); // Maps user_id -> socket.id

    // Initializing Nodemailer dummy configuration utilizing Ethereal explicitly for testing
    // Can be overwritten by generic .env files holding active SMTP endpoints.
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.ethereal.email",
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_USER || "dummy_test_user@ethereal.email",
        pass: process.env.SMTP_PASS || "dummy_password",
      },
    });
  }

  setIO(ioInstance) {
    this.io = ioInstance;

    this.io.on("connection", (socket) => {
      console.log(`Socket Stream Active: ${socket.id}`);

      // Client signals their explicit ID upon React dashboard initialization
      socket.on("register", (userId) => {
        this.connectedUsers.set(userId, socket.id);
        console.log(`User ${userId} bounded to socket ${socket.id}`);
      });

      // Chat specific socket rooms
      socket.on("join_room", (roomName) => {
        socket.join(roomName);
        console.log(`Socket ${socket.id} joined room: ${roomName}`);
      });

      // Typing indicators
      socket.on("typing", (data) => {
        // data should have { receiverId, senderId }
        const activeSocket = this.connectedUsers.get(data.receiverId);
        if (activeSocket) {
          this.io.to(activeSocket).emit("user_typing", data);
        }
      });

      socket.on("stop_typing", (data) => {
        const activeSocket = this.connectedUsers.get(data.receiverId);
        if (activeSocket) {
          this.io.to(activeSocket).emit("user_stop_typing", data);
        }
      });

      socket.on("disconnect", () => {
        // Remove socket tracking upon stream termination
        for (let [key, value] of this.connectedUsers.entries()) {
          if (value === socket.id) {
            this.connectedUsers.delete(key);
            break;
          }
        }
      });
    });
  }

  async emitNotification(recipientId, type, content) {
    try {
      // 1. Persistence - Record inside SQL Database securely
      const notification = await Notification.create({
        user_id: recipientId,
        type: type,
        content: content,
        is_read: false,
      });

      const parsedPayload = {
        id: notification.notification_id,
        type: notification.type,
        content: notification.content,
        createdAt: notification.createdAt,
      };

      // 2. Real-Time UI Trigger - Check if mapped to a live connection
      const activeSocket = this.connectedUsers.get(recipientId);
      if (activeSocket && this.io) {
        this.io.to(activeSocket).emit("notification_event", parsedPayload);
      }

      // 3. Fallback Mailer - Trigger SMTP processing concurrently
      const targetUser = await User.findByPk(recipientId);
      if (targetUser && targetUser.email) {
        const mailOptions = {
          // from: '"TeamMates Finder" <noreply@teammates-finder.srmist.edu.in>',
          from: '"TeamMates Finder" <noreply@teammates-finder>',
          to: targetUser.email,
          subject: `New TeamMates Alert: ${type.replace("_", " ")}`,
          html: `
                        <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
                            <h2 style="color: #E11D48;">TeamMates Notification</h2>
                            <p style="font-size: 16px; color: #333;">${content}</p>
                            <a href="http://localhost:5173/dashboard" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #111827; color: white; text-decoration: none; border-radius: 8px;">View Dashboard</a>
                        </div>
                    `,
        };

        // Do not explicitly halt the engine for SMTP responses (fire and forget pattern)
        this.transporter.sendMail(mailOptions).catch((err) => {
          console.error("SMTP Failure parsing notification:", err);
        });
      }

      return true;
    } catch (error) {
      console.error("Centralized Notification Generation fault:", error);
      return false;
    }
  }

  async emitMessage(messageRecord) {
    try {
      const parsedMessage = {
        message_id: messageRecord.message_id,
        sender_id: messageRecord.sender_id,
        receiver_id: messageRecord.receiver_id,
        content: messageRecord.content,
        post_id: messageRecord.post_id,
        createdAt: messageRecord.createdAt,
        Sender: messageRecord.Sender,
        Receiver: messageRecord.Receiver
      };

      // Real-Time Delivery
      const activeSocket = this.connectedUsers.get(messageRecord.receiver_id);
      if (activeSocket && this.io) {
        this.io.to(activeSocket).emit("receive_message", parsedMessage);
      } else {
        // Nodemailer Fallback (if offline)
        const targetUser = await User.findByPk(messageRecord.receiver_id);
        if (targetUser && targetUser.email) {
          const mailOptions = {
            from: '"TeamMates Chat" <noreply@teammates-finder>',
            to: targetUser.email,
            subject: `New Message from ${messageRecord.Sender?.name || 'a teammate'}`,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
                <h2 style="color: #E11D48;">You have a new message!</h2>
                <p style="font-size: 16px; color: #333;"><strong>${messageRecord.Sender?.name || 'A teammate'}:</strong> "${messageRecord.content}"</p>
                <a href="http://localhost:5173/messages" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #111827; color: white; text-decoration: none; border-radius: 8px;">Reply Now</a>
              </div>
            `,
          };
          this.transporter.sendMail(mailOptions).catch(err => console.error("SMTP Chat Fallback Failure:", err));
        }
      }
      return true;
    } catch (error) {
      console.error("Message Emission fault:", error);
      return false;
    }
  }
}

// Export as globally mapped Singleton
export default new NotificationService();
