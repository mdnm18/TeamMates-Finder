import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, CheckCircle } from 'lucide-react';

const RatingModal = ({ isOpen, onClose, targetUser }) => {
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    if (!isOpen || !targetUser) return null;

    const handleRating = (val) => {
        setRating(val);
    };

    const submitReputation = () => {
        // Pseudo-submission mapping plan.md UI constraint structurally.
        // In full iterations this hits /api/users/rate explicitly.
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setRating(0);
            onClose();
        }, 1500);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    onClick={onClose}
                />
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 30 }}
                    className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden flex flex-col text-center"
                    onClick={e => e.stopPropagation()}
                >
                    {!submitted ? (
                        <div className="p-8">
                            <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-900 transition-colors bg-gray-50 hover:bg-gray-100 p-2 rounded-full">
                                <X size={20} />
                            </button>

                            <div className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
                                <Star size={32} className="fill-current" />
                            </div>
                            
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">Rate Teammate</h2>
                            <p className="text-gray-500 text-sm mb-6">How was your collaboration experience alongside <span className="font-bold text-gray-900">{targetUser.name}</span>?</p>

                            <div className="flex justify-center gap-2 mb-8">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <motion.button
                                        key={star}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        onMouseEnter={() => setHovered(star)}
                                        onMouseLeave={() => setHovered(0)}
                                        onClick={() => handleRating(star)}
                                        className="focus:outline-none transition-colors"
                                    >
                                        <Star 
                                            size={42} 
                                            className={`transition-colors ${
                                                (hovered || rating) >= star 
                                                    ? 'text-amber-400 fill-amber-400' 
                                                    : 'text-gray-200 fill-gray-100'
                                            }`} 
                                        />
                                    </motion.button>
                                ))}
                            </div>

                            <button 
                                onClick={submitReputation}
                                disabled={rating === 0}
                                className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold text-lg shadow-md hover:bg-rose-600 transition-all disabled:opacity-50 disabled:hover:bg-gray-900"
                            >
                                Submit Feedback
                            </button>
                        </div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="p-10 flex flex-col items-center justify-center"
                        >
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", bounce: 0.5 }}
                                className="text-emerald-500 mb-4"
                            >
                                <CheckCircle size={64} />
                            </motion.div>
                            <h2 className="text-2xl font-bold text-gray-900">Thank You!</h2>
                            <p className="text-gray-500">Reputation scores aggregated successfully.</p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default RatingModal;
