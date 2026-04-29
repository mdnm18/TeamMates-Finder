import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import api from '../../services/api';
import { triggerHeavy, triggerError } from '../../utils/haptics';

const PitchModal = ({ isOpen, onClose, selectedPost }) => {
    const [pitch, setPitch] = useState('');
    const [submitting, setSubmitting] = useState(false);

    if (!isOpen || !selectedPost) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.post(`/requests/send/${selectedPost.post_id}`, { pitch_message: pitch });
            setPitch('');
            // Trigger physical confirmation bump mapping Mobile-native feel
            triggerHeavy();
            onClose();
        } catch (error) {
            console.error('Pitch sending failed:', error);
            triggerError();
            alert(error.response?.data?.error || 'Failed to submit application');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    onClick={onClose}
                />
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-rose-600 text-white">
                        <h2 className="text-xl font-bold">Apply for Position</h2>
                        <button onClick={onClose} className="text-rose-100 hover:bg-rose-500 p-2 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
                        <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl">
                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-1">Applying to Target</h4>
                            <p className="font-bold text-gray-900 leading-tight">{selectedPost.title}</p>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Pitch Message (Optional)</label>
                            <textarea 
                                value={pitch}
                                onChange={(e) => setPitch(e.target.value)}
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none resize-none transition-all placeholder-gray-300"
                                placeholder="Why are you a good fit? Mention relevant projects or specific skills..."
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            <button type="button" onClick={onClose} className="px-5 py-2 font-medium text-gray-600 hover:text-gray-900 transition-colors">
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                disabled={submitting}
                                className="bg-gray-900 text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:bg-rose-600 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                                {submitting ? 'Transmitting...' : 'Send Pitch'} <Send size={16} />
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default PitchModal;
