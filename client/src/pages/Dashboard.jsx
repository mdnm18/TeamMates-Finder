import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/slices/postSlice';
import Sidebar from '../components/layout/Sidebar';
import PostCard from '../components/posts/PostCard';
import CreatePostModal from '../components/posts/CreatePostModal';
import PitchModal from '../components/requests/PitchModal';
import { PostSkeleton } from '../components/ui/Skeleton';
import { Search, Filter, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { items: posts, status, error } = useSelector(state => state.posts);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    
    // Pitch state mapping
    const [isPitchModalOpen, setPitchModalOpen] = useState(false);
    const [selectedPostToPitch, setSelectedPostToPitch] = useState(null);
    
    // Filters state
    const [typeFilter, setTypeFilter] = useState('');
    const [skillFilter, setSkillFilter] = useState('');
    const [searchInput, setSearchInput] = useState(''); // Local text search

    useEffect(() => {
        // Debounce or trigger fetch directly depending on requirements
        // For MVP, we'll fetch when typeFilter or skillFilter changes
        dispatch(fetchPosts({ type: typeFilter, skill: skillFilter }));
    }, [dispatch, typeFilter, skillFilter]);

    // Apply strict text search over fetched elements (client-side extension of Discovery)
    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        post.description.toLowerCase().includes(searchInput.toLowerCase())
    );

    const handleApplyClick = (post) => {
        setSelectedPostToPitch(post);
        setPitchModalOpen(true);
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gray-50 flex flex-col md:flex-row"
        >
            <Sidebar onOpenCreate={() => setCreateModalOpen(true)} />
            
            <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 pb-24 md:pb-8">
                {/* Header Profile / Search Block */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Search size={18} />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Discover projects or hackathons..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="bg-gray-50 w-full pl-10 pr-4 py-2.5 rounded-xl border-none focus:ring-2 focus:ring-rose-500 outline-none text-gray-700 transition-all font-medium"
                        />
                    </div>
                </div>

                {/* Filter Chips */}
                <div className="flex flex-wrap gap-3 mb-6 items-center">
                    <Filter size={18} className="text-gray-400 mr-2" />
                    <button 
                        onClick={() => setTypeFilter('')}
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                            typeFilter === '' ? 'bg-rose-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        All
                    </button>
                    {['Hackathon', 'Personal Project', 'Competitive Programming'].map(type => (
                        <button 
                            key={type}
                            onClick={() => setTypeFilter(type)}
                            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                                typeFilter === type ? 'bg-rose-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                    
                    <div className="ml-auto w-full md:w-auto mt-2 md:mt-0 flex">
                        <span className="text-sm font-medium text-gray-500 mr-2 self-center">Skill tag:</span>
                        <input 
                            type="text" 
                            placeholder="e.g. React"
                            defaultValue={skillFilter}
                            onBlur={(e) => setSkillFilter(e.target.value)}
                            onKeyDown={(e) => {
                                if(e.key === 'Enter') setSkillFilter(e.target.value);
                            }}
                            className="w-32 bg-white border border-gray-200 px-3 py-1 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                        />
                    </div>
                </div>

                {/* Feed System mapped into rigid Grid layout */}
                {status === 'failed' && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3">
                        <AlertCircle size={20} />
                        <p className="font-medium">Failed to load feed. Refresh the page to try again.</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {status === 'loading' ? (
                        <>
                            <PostSkeleton />
                            <PostSkeleton />
                            <PostSkeleton />
                            <PostSkeleton />
                        </>
                    ) : filteredPosts.length > 0 ? (
                        filteredPosts.map(post => (
                            <PostCard key={post.post_id} post={post} onApplyClick={handleApplyClick} />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-gray-100 border-dashed">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search size={24} className="text-gray-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">No matches found</h3>
                            <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                        </div>
                    )}
                </div>
            </main>

            <CreatePostModal 
                isOpen={isCreateModalOpen} 
                onClose={() => setCreateModalOpen(false)} 
            />

            <PitchModal
                isOpen={isPitchModalOpen}
                onClose={() => setPitchModalOpen(false)}
                selectedPost={selectedPostToPitch}
            />
        </motion.div>
    );
};

export default Dashboard;
