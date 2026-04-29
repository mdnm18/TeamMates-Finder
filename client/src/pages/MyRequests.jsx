import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import api from '../services/api';
import { Check, X, Clock, Layers, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { triggerSuccess, triggerError } from '../utils/haptics';
import RatingModal from '../components/ui/RatingModal';

const MyRequests = () => {
    const [incoming, setIncoming] = useState([]);
    const [outgoing, setOutgoing] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Rating Modal State
    const [isRatingOpen, setRatingOpen] = useState(false);
    const [userToRate, setUserToRate] = useState(null);

    const fetchRequests = async () => {
        try {
            const { data } = await api.get('/requests/me');
            setIncoming(data.incoming);
            setOutgoing(data.outgoing);
        } catch (error) {
            console.error('Failed request fetch:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleAction = async (requestId, actionType) => {
        try {
            await api.put(`/requests/handle/${requestId}`, { action: actionType });
            triggerSuccess();
            // Refresh explicitly after transaction mapping
            fetchRequests();
        } catch (error) {
            triggerError();
            alert(error.response?.data?.error || "Action failed to process");
        }
    };

    const openRating = (user) => {
        setUserToRate(user);
        setRatingOpen(true);
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'Accepted': return 'bg-emerald-100 text-emerald-700';
            case 'Rejected': return 'bg-red-100 text-red-700';
            default: return 'bg-amber-100 text-amber-700';
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gray-50 flex flex-col md:flex-row"
        >
            <Sidebar onOpenCreate={() => {}} />

            <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 pb-24 md:pb-8 flex flex-col gap-8">
                
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-rose-100 text-rose-600 p-2 rounded-lg">
                            <Layers size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Incoming Applicants</h2>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
                        {loading ? (
                            <div className="text-center text-gray-400 py-4">Scanning system...</div>
                        ) : incoming.length === 0 ? (
                            <div className="text-center text-gray-500 py-10">No pending applications on your posts.</div>
                        ) : (
                            incoming.map(req => (
                                <div key={req.request_id} className="p-4 border border-gray-100 rounded-xl bg-gray-50 hover:bg-rose-50/30 transition-colors flex flex-col md:flex-row justify-between gap-4 md:items-center">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-bold text-rose-600 tracking-wider uppercase">{req.Post.title}</span>
                                            <span className={`text-xs px-2 py-1 rounded-md font-bold ${getStatusColor(req.status)}`}>{req.status}</span>
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-lg">{req.Sender.name}</h3>
                                        <p className="text-sm text-gray-500">{req.Sender.department}</p>
                                        {req.pitch_message && (
                                            <div className="mt-3 bg-white p-3 border border-gray-200 rounded-lg text-sm italic text-gray-600">
                                                "{req.pitch_message}"
                                            </div>
                                        )}
                                    </div>
                                    
                                    {req.status === 'Pending' && (
                                        <div className="flex gap-2 shrink-0">
                                            <button onClick={() => handleAction(req.request_id, 'Reject')} className="p-3 bg-white border border-gray-200 rounded-xl text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors tooltip tooltip-top" data-tip="Reject">
                                                <X size={20} />
                                            </button>
                                            <button onClick={() => handleAction(req.request_id, 'Accept')} className="p-3 bg-gray-900 text-white rounded-xl shadow-md hover:bg-emerald-500 transition-colors flex items-center gap-2 font-semibold">
                                                <Check size={20} /> Accept
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </section>

                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-gray-200 text-gray-600 p-2 rounded-lg">
                            <Clock size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Your Outgoing Applications</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {loading ? ( null ) : outgoing.length === 0 ? (
                            <div className="col-span-full text-center text-gray-500 bg-white border border-gray-100 rounded-2xl py-10">You haven't sent any applications yet.</div>
                        ) : (
                            outgoing.map(req => (
                                <div key={req.request_id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className={`text-xs px-2 py-0.5 rounded font-bold ${getStatusColor(req.status)}`}>{req.status}</span>
                                        {req.status === 'Accepted' && (
                                            <button 
                                                onClick={() => openRating(req.Receiver)}
                                                className="flex items-center gap-1 text-xs font-semibold text-white bg-amber-500 hover:bg-amber-600 px-2 py-1 rounded-md transition-colors shadow-sm"
                                            >
                                                Rate <Star size={12} className="fill-current" />
                                            </button>
                                        )}
                                        {req.status !== 'Accepted' && (
                                            <span className="text-xs text-gray-400 font-mono">#{req.request_id.split('-')[0]}</span>
                                        )}
                                    </div>
                                    <h4 className="font-bold text-lg text-gray-900 leading-tight mb-1">{req.Post.title}</h4>
                                    <p className="text-sm text-gray-500 mb-4">Sent to {req.Receiver.name}</p>
                                    <div className="w-full bg-gray-50 h-1.5 rounded-full overflow-hidden">
                                        {req.status === 'Pending' && <div className="bg-amber-400 w-1/2 h-full" />}
                                        {req.status === 'Accepted' && <div className="bg-emerald-500 w-full h-full" />}
                                        {req.status === 'Rejected' && <div className="bg-red-500 w-full h-full" />}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>

            </main>
            
            <RatingModal 
                isOpen={isRatingOpen}
                onClose={() => setRatingOpen(false)}
                targetUser={userToRate}
            />
        </motion.div>
    );
};

export default MyRequests;
