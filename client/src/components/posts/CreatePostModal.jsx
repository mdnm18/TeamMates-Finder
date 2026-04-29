import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/slices/postSlice';

const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(15, "Description must be at least 15 characters"),
  type: z.enum(['Hackathon', 'Personal Project', 'Competitive Programming']),
  vacancies: z.number().min(1).max(50, "Limit vaccines to 50"),
});

const CreatePostModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState('');

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(postSchema),
        defaultValues: { vacancies: 1, type: 'Hackathon' }
    });

    if (!isOpen) return null;

    const handleAddSkill = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = skillInput.trim().toUpperCase();
            if (val && !skills.includes(val)) {
                setSkills([...skills, val]);
            }
            setSkillInput('');
        }
    };

    const removeSkill = (sk) => setSkills(skills.filter(s => s !== sk));

    const onSubmit = async (data) => {
        try {
            await dispatch(createPost({ ...data, skills })).unwrap();
            reset();
            setSkills([]);
            onClose();
        } catch (error) {
            console.error("Failed to create post:", error);
            alert("Creation failed: " + (error.error || "Unknown error"));
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
                    className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">Publish New Post</h2>
                        <button onClick={onClose} className="text-gray-400 hover:bg-gray-100 p-2 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                        <form id="create-post-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input 
                                    {...register("title")} 
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
                                    placeholder="e.g. Need frontend dev for Smart India Hackathon"
                                />
                                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
                                <select 
                                    {...register("type")} 
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
                                >
                                    <option value="Hackathon">Hackathon</option>
                                    <option value="Personal Project">Personal Project</option>
                                    <option value="Competitive Programming">Competitive Programming</option>
                                </select>
                                {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Vacancies Required</label>
                                <input 
                                    type="number" 
                                    {...register("vacancies", { valueAsNumber: true })} 
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
                                />
                                {errors.vacancies && <p className="text-red-500 text-xs mt-1">{errors.vacancies.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea 
                                    {...register("description")} 
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none resize-none"
                                    placeholder="Explain your idea, current stack, and what you're looking for..."
                                />
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills</label>
                                <div className="p-3 border border-gray-200 rounded-xl flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-rose-500 focus-within:border-transparent transition-all">
                                    {skills.map(sk => (
                                        <span key={sk} className="flex items-center gap-1 bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded-md font-medium">
                                            {sk}
                                            <button type="button" onClick={() => removeSkill(sk)} className="hover:text-rose-600">
                                                <X size={14} />
                                            </button>
                                        </span>
                                    ))}
                                    <input 
                                        type="text"
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                        onKeyDown={handleAddSkill}
                                        placeholder="Type skill + Enter"
                                        className="flex-1 bg-transparent border-none outline-none text-sm min-w-[120px]"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 font-medium text-gray-600 hover:text-gray-900 transition-colors">
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            form="create-post-form" 
                            disabled={isSubmitting}
                            className="bg-rose-600 text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:bg-rose-700 active:scale-95 transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? 'Posting...' : 'Publish'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default CreatePostModal;
