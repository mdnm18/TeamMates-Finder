import React from 'react';
import { User, Users, Briefcase, Star, Send } from 'lucide-react';

const PostCard = ({ post, onApplyClick }) => {
    // Generate gradient based on type
    const getTypeColor = (type) => {
        switch(type) {
            case 'Hackathon': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Competitive Programming': return 'bg-purple-100 text-purple-800 border-purple-200';
            default: return 'bg-emerald-100 text-emerald-800 border-emerald-200';
        }
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col h-full cursor-pointer overflow-hidden relative">
            {/* Top Indicator */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                        <User size={24} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900">{post.User?.name || 'Unknown Author'}</h4>
                        <div className="flex items-center text-xs text-gray-500 gap-2">
                            <span>{post.User?.department || 'Student'}</span>
                            {post.User?.avg_rating > 0 && (
                                <span className="flex items-center text-amber-500">
                                    <Star size={12} className="mr-1 fill-current" /> {post.User.avg_rating}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full border font-semibold tracking-wide ${getTypeColor(post.type)}`}>
                    {post.type}
                </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{post.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-1">
                {post.description}
            </p>

            <div className="mt-auto">
                {post.Skills && post.Skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.Skills.map(s => (
                            <span key={s.skill_name} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md font-medium">
                                {s.skill_name}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center text-rose-600 text-sm font-semibold">
                        <Users size={16} className="mr-2" />
                        {post.vacancies} {post.vacancies === 1 ? 'spot' : 'spots'} left
                    </div>
                    
                    <button onClick={() => onApplyClick(post)} className="flex items-center gap-2 text-sm font-semibold text-white bg-gray-900 px-4 py-2 rounded-xl group-hover:bg-rose-600 transition-colors">
                        Apply Max <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
