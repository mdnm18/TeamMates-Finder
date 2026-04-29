import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserPlus, ArrowRight, X } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

const schema = z.object({
    registration_no: z.string().min(5, "Registration Number is required"),
    department: z.string().min(2, "Department is required"),
    github_url: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    linkedin_url: z.string().url("Must be a valid URL").optional().or(z.literal('')),
});

const ProfileSetup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState('');

    // Pre-filled from Login redirect
    const userEmail = location.state?.email || 'Student';

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

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

    const removeSkill = (sk) => {
        setSkills(skills.filter(s => s !== sk));
    };

    const onSubmit = async (data) => {
        setSubmitting(true);
        setServerError('');
        try {
            const payload = {
                ...data,
                skills,
            };
            const response = await api.post('/auth/onboard', payload);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/dashboard');
        } catch (error) {
            setServerError(error.response?.data?.error || "An error occurred during onboarding.");
            console.error("Onboarding failed:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gray-50 flex justify-center items-center p-4"
        >
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden">
                <div className="bg-rose-600 p-6 text-white flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                        <UserPlus size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Complete Your Profile</h2>
                        <p className="text-rose-100">Welcome, {userEmail}! Let's set things up.</p>
                    </div>
                </div>

                <div className="p-8">
                    {serverError && (
                        <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-lg">
                            {serverError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Registration No *</label>
                                <input 
                                    {...register("registration_no")} 
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                                    placeholder="RA20110030101xx"
                                />
                                {errors.registration_no && <p className="text-red-500 text-xs mt-1">{errors.registration_no.message}</p>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                                <input 
                                    {...register("department")} 
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                                    placeholder="e.g. Computer Science"
                                />
                                {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
                                <input 
                                    {...register("github_url")} 
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                                    placeholder="https://github.com/username"
                                />
                                {errors.github_url && <p className="text-red-500 text-xs mt-1">{errors.github_url.message}</p>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                                <input 
                                    {...register("linkedin_url")} 
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                                    placeholder="https://linkedin.com/in/username"
                                />
                                {errors.linkedin_url && <p className="text-red-500 text-xs mt-1">{errors.linkedin_url.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Skills</label>
                            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {skills.map(sk => (
                                        <span key={sk} className="flex items-center gap-1 bg-rose-100 text-rose-800 text-xs px-3 py-1 rounded-full font-medium">
                                            {sk}
                                            <button type="button" onClick={() => removeSkill(sk)} className="hover:text-rose-600">
                                                <X size={14} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <input 
                                    type="text"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyDown={handleAddSkill}
                                    placeholder="Type a skill and press Enter"
                                    className="w-full bg-transparent outline-none text-sm"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full flex items-center justify-center gap-2 bg-rose-600 text-white hover:bg-rose-700 transition-colors py-3 px-4 rounded-xl font-semibold disabled:opacity-50"
                            >
                                {submitting ? 'Setting up...' : 'Complete Profile'}
                                {!submitting && <ArrowRight size={20} />}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </motion.div>
    );
};

export default ProfileSetup;
