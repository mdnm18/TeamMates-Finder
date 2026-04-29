import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User as UserIcon, MessageSquare } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import socket from '../services/socket';
import { toast } from 'react-toastify';

const Messages = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [conversations, setConversations] = useState([]); // List of users you can chat with
  const [activePartner, setActivePartner] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // For MVP testing: fetch all other registered users to chat with
    const fetchPartners = async () => {
      if (!token) return;
      try {
        const res = await axios.get('/api/users/all', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setConversations(res.data);
      } catch (err) {
        console.error('Failed to load chat partners:', err);
      }
    };
    fetchPartners();
  }, [token]);

  useEffect(() => {
    if (activePartner && token) {
      const fetchHistory = async () => {
        try {
          const res = await axios.get(`/api/messages/${activePartner.user_id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setMessages(res.data);
          scrollToBottom();
        } catch (error) {
          console.error(error);
        }
      };
      fetchHistory();
    }
  }, [activePartner, token]);

  useEffect(() => {
    if (!user) return;

    socket.on("receive_message", (message) => {
      if (activePartner && (message.sender_id === activePartner.user_id || message.receiver_id === activePartner.user_id)) {
        setMessages(prev => [...prev, message]);
        scrollToBottom();
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
      } else {
        toast.info(`New message from ${message.Sender?.name}`);
      }
    });

    socket.on("user_typing", (data) => {
      if (activePartner && data.senderId === activePartner.user_id) setIsTyping(true);
    });

    socket.on("user_stop_typing", (data) => {
      if (activePartner && data.senderId === activePartner.user_id) setIsTyping(false);
    });

    return () => {
      socket.off("receive_message");
      socket.off("user_typing");
      socket.off("user_stop_typing");
    };
  }, [activePartner, user]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activePartner) return;

    const content = newMessage;
    setNewMessage('');
    if (navigator.vibrate) navigator.vibrate(50);
    socket.emit("stop_typing", { receiverId: activePartner.user_id, senderId: user.user_id });

    try {
      const res = await axios.post('/api/messages', 
        { receiverId: activePartner.user_id, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(prev => [...prev, res.data]);
      scrollToBottom();
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    if (!activePartner) return;
    
    if (e.target.value) {
      socket.emit("typing", { receiverId: activePartner.user_id, senderId: user.user_id });
    } else {
      socket.emit("stop_typing", { receiverId: activePartner.user_id, senderId: user.user_id });
    }
  };

  return (
    <div className="flex min-h-screen bg-bgLight">
      <Sidebar />
      <div className="flex-1 p-4 md:p-10 lg:pl-16 relative flex gap-6">
        
        {/* Contacts Sidebar */}
        <div className="w-1/3 max-w-sm hidden md:flex flex-col gap-4">
          <h2 className="text-2xl font-bold flex items-center gap-2"><MessageSquare className="text-primary"/> Messages</h2>
          <div className="flex flex-col gap-2">
            {conversations.map(partner => (
              <motion.div 
                whileTap={{ scale: 0.98 }}
                key={partner.user_id} 
                onClick={() => setActivePartner(partner)}
                className={`p-4 rounded-2xl cursor-pointer transition-all ${activePartner?.user_id === partner.user_id ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-800 hover:bg-gray-50 border border-gray-100'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${activePartner?.user_id === partner.user_id ? 'bg-white/20' : 'bg-rose-100 text-primary'}`}>
                    {partner.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold">{partner.name}</h4>
                    <p className={`text-xs ${activePartner?.user_id === partner.user_id ? 'text-white/80' : 'text-gray-500'}`}>{partner.department}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            {conversations.length === 0 && <p className="text-gray-400 text-sm p-4">No active connections yet.</p>}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 glassmorphism rounded-4xl flex flex-col overflow-hidden border border-white/40 shadow-xl h-[calc(100vh-80px)] md:h-[calc(100vh-80px)] pb-16 md:pb-0">
          {activePartner ? (
            <>
              {/* Chat Header */}
              <div className="bg-white/80 backdrop-blur-md p-4 border-b border-gray-100 flex items-center gap-4 z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl relative">
                  {activePartner.name.charAt(0)}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{activePartner.name}</h3>
                  <p className="text-xs text-green-600 font-medium">Online</p>
                </div>
              </div>

              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[url('/dot-matrix.png')] bg-repeat opacity-90">
                {messages.map((msg, idx) => {
                  const isMe = msg.sender_id === user.user_id;
                  return (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      key={msg.message_id || idx} 
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] p-4 rounded-3xl ${isMe ? 'bg-primary text-white rounded-br-sm shadow-md' : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100'}`}>
                        <p className="text-[15px] leading-relaxed">{msg.content}</p>
                        <span className={`text-[10px] mt-2 block ${isMe ? 'text-white/70 text-right' : 'text-gray-400'}`}>
                          {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
                
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-white p-4 rounded-3xl rounded-bl-sm shadow-sm border border-gray-100 flex gap-1 items-center h-10">
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-white/90 backdrop-blur-md border-t border-gray-100 pb-safe">
                <form onSubmit={handleSend} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={handleTyping}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-100 border-none rounded-full px-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all text-gray-800"
                  />
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="p-4 bg-primary text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:bg-rose-700 transition-colors"
                  >
                    <Send size={20} />
                  </motion.button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <MessageSquare size={40} className="text-gray-300" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Team Messages</h2>
              <p className="max-w-xs">Select a teammate from the sidebar to start a real-time conversation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
