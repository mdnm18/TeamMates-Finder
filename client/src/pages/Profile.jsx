import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, MapPin, Mail, Phone, BookOpen, Download, QrCode } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import DynamicListManager from '../components/profile/DynamicListManager';
import ProfileQRCode from '../components/profile/ProfileQRCode';
import html2pdf from 'html2pdf.js';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfileData(res.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleExportPDF = () => {
    toast.info('Opening Print Dialog. Save as PDF!', { autoClose: 3000 });
    setTimeout(() => {
        window.print();
    }, 500);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-bgLight">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-bgLight">
      <Sidebar />
      <div className="flex-1 p-4 md:p-10 lg:pl-16 relative">
        {/* Subtle Mandala Watermark */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[url('/mandala.svg')] bg-no-repeat bg-cover opacity-5 pointer-events-none"></div>

        <div id="profile-content-to-print" className="max-w-5xl mx-auto z-10 relative pb-24 md:pb-0">
          {/* Header Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glassmorphism p-8 rounded-4xl flex flex-col md:flex-row items-center md:items-start gap-8"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-5xl font-bold shadow-xl border-4 border-white">
              {profileData?.name?.charAt(0) || 'U'}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">{profileData?.name}</h1>
              <p className="text-lg text-gray-500 font-medium mt-1">{profileData?.department} {profileData?.degree ? `- ${profileData.degree}` : ''}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                {profileData?.native_location && (
                  <span className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    <MapPin size={14} /> {profileData.native_location}
                  </span>
                )}
                {profileData?.cgpa && (
                  <span className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    <BookOpen size={14} /> {profileData.cgpa} CGPA
                  </span>
                )}
                {profileData?.personal_email && (
                  <span className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    <Mail size={14} /> {profileData.personal_email}
                  </span>
                )}
              </div>
            </div>

            <div className="flex md:flex-col gap-3">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={handleExportPDF}
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-colors"
              >
                <Download size={18} /> Export PDF
              </motion.button>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsQRModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 border border-gray-200 rounded-xl font-bold shadow-sm hover:bg-gray-50 transition-colors"
              >
                <QrCode size={18} /> QR Code
              </motion.button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <DynamicListManager 
                title="Experience" 
                type="experience" 
                items={profileData?.experiences} 
                onUpdate={fetchProfile} 
              />
              <DynamicListManager 
                title="Tools & Skills" 
                type="tool" 
                items={profileData?.tools} 
                onUpdate={fetchProfile} 
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <DynamicListManager 
                title="Clubs & Societies" 
                type="club" 
                items={profileData?.clubs} 
                onUpdate={fetchProfile} 
              />
              <DynamicListManager 
                title="Communities" 
                type="community" 
                items={profileData?.communities} 
                onUpdate={fetchProfile} 
              />
            </motion.div>
          </div>

        </div>
      </div>
      
      <ProfileQRCode 
        isOpen={isQRModalOpen} 
        onClose={() => setIsQRModalOpen(false)} 
        profileUrl={`https://teammates-finder.com/profile/${profileData?.user_id}`} 
      />
    </div>
  );
};

export default Profile;
