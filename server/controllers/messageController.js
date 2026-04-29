import { Message, User } from '../models/index.js';
import { Op } from 'sequelize';
import NotificationService from '../services/NotificationService.js';

export const getConversation = async (req, res) => {
    try {
        const { partnerId } = req.params;
        const user = await User.findOne({ where: { email: req.user.email } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { sender_id: user.user_id, receiver_id: partnerId },
                    { sender_id: partnerId, receiver_id: user.user_id }
                ]
            },
            order: [['createdAt', 'ASC']],
            include: [
                { model: User, as: 'Sender', attributes: ['name', 'user_id'] },
                { model: User, as: 'Receiver', attributes: ['name', 'user_id'] }
            ]
        });

        // Mark messages as read
        await Message.update(
            { is_read: true },
            { where: { sender_id: partnerId, receiver_id: user.user_id, is_read: false } }
        );

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching conversation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { receiverId, content, postId } = req.body;
        const sender = await User.findOne({ where: { email: req.user.email } });
        if (!sender) return res.status(404).json({ error: 'User not found' });

        const message = await Message.create({
            sender_id: sender.user_id,
            receiver_id: receiverId,
            content,
            post_id: postId || null
        });

        const fullMessage = await Message.findByPk(message.message_id, {
            include: [
                { model: User, as: 'Sender', attributes: ['name', 'user_id'] },
                { model: User, as: 'Receiver', attributes: ['name', 'user_id'] }
            ]
        });

        // Trigger real-time push and fallback logic
        NotificationService.emitMessage(fullMessage);

        res.status(201).json(fullMessage);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
