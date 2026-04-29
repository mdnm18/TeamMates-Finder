import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Login from './pages/Login';
import ProfileSetup from './pages/ProfileSetup';
import Dashboard from './pages/Dashboard';
import MyRequests from './pages/MyRequests';
import Profile from './pages/Profile';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import Messages from './pages/Messages';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socket, { connectSocket, disconnectSocket } from './services/socket';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const GlobalSocketTracker = () => {
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if (user && user.user_id) {
            connectSocket(user.user_id);
            
            const handleNotification = (notifInfo) => {
                const messageBlocks = notifInfo.content;
                if(notifInfo.type.includes('Accepted')) toast.success(messageBlocks);
                else if(notifInfo.type.includes('Rejected')) toast.error(messageBlocks);
                else toast.info(messageBlocks);
                
                // Triggers native notification sound (optional depending on browser standards)
                try {
                    new Audio('/pop.mp3').play().catch(() => {});
                } catch(e) {}
            };

            socket.on('notification_event', handleNotification);

            return () => {
                socket.off('notification_event', handleNotification);
            };
        } else {
            disconnectSocket();
        }
    }, [user]);

    return null;
};

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/onboarding" element={<ProfileSetup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/my-requests" element={<MyRequests />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/analytics" element={<AnalyticsDashboard />} />
                {/* Fallback pattern */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </AnimatePresence>
    );
};

const App = () => {
    return (
        <Router>
            <GlobalSocketTracker />
            <ToastContainer 
                position="top-right" 
                autoClose={4000} 
                hideProgressBar={true} 
                newestOnTop={true} 
                theme="colored" 
                toastClassName="rounded-xl font-medium shadow-xl"
            />
            <AnimatedRoutes />
        </Router>
    );
};
export default App;
