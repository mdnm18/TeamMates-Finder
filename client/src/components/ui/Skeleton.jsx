import React from 'react';
import { motion } from 'framer-motion';

const Skeleton = ({ className = "" }) => {
    return (
        <motion.div 
            className={`bg-gray-200 rounded-xl ${className}`}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
    );
};

export const PostSkeleton = () => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
        <div className="flex justify-between items-start">
            <div className="flex gap-3">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex flex-col gap-2 justify-center">
                    <Skeleton className="w-32 h-4" />
                    <Skeleton className="w-20 h-3" />
                </div>
            </div>
            <Skeleton className="w-24 h-6 rounded-full" />
        </div>
        <Skeleton className="w-3/4 h-6 mt-2" />
        <Skeleton className="w-full h-4 mt-2" />
        <Skeleton className="w-5/6 h-4" />
        <div className="flex gap-2 mt-4">
            <Skeleton className="w-16 h-6 rounded-full" />
            <Skeleton className="w-20 h-6 rounded-full" />
        </div>
    </div>
);

export default Skeleton;
