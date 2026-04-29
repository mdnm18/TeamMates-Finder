import React from "react";
import { Home, PlusCircle, Bell, History, LogOut, User as UserIcon, TrendingUp, MessageSquare } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = ({ onOpenCreate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const triggerHaptic = () => {
    if (navigator.vibrate) navigator.vibrate(50);
  };

  const handleLogout = () => {
    triggerHaptic();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 min-h-screen sticky top-0 p-6 shadow-sm z-30">
        <div className="flex items-center gap-3 mb-10 text-rose-600">
          <div className="bg-rose-100 p-2 rounded-xl">
            <img
              src="/logo.png"
              alt="TeamMates Logo"
              className="w-10 h-10 object-contain"
            />
          </div>
          <h1 className="text-xl font-bold">TeamMates</h1>
        </div>

        <nav className="flex-1 space-y-2">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-4 w-full p-3 rounded-xl bg-gray-50 text-gray-900 font-semibold transition-colors"
          >
            <Home size={20} /> Feed
          </button>
          <button 
            onClick={() => navigate("/analytics")}
            className="flex items-center gap-4 w-full p-3 rounded-xl text-gray-500 hover:bg-rose-50 hover:text-rose-600 transition-colors font-medium"
          >
            <TrendingUp size={20} /> Analytics
          </button>
          <button 
            onClick={() => navigate("/messages")}
            className="flex items-center gap-4 w-full p-3 rounded-xl text-gray-500 hover:bg-rose-50 hover:text-rose-600 transition-colors font-medium"
          >
            <MessageSquare size={20} /> Messages
          </button>
          <button className="flex items-center gap-4 w-full p-3 rounded-xl text-gray-500 hover:bg-rose-50 hover:text-rose-600 transition-colors font-medium">
            <Bell size={20} /> Notifications
          </button>
          <button
            onClick={() => navigate("/my-requests")}
            className="flex items-center gap-4 w-full p-3 rounded-xl text-gray-500 hover:bg-rose-50 hover:text-rose-600 transition-colors font-medium"
          >
            <History size={20} /> My Requests
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-4 w-full p-3 rounded-xl text-gray-500 hover:bg-rose-50 hover:text-rose-600 transition-colors font-medium"
          >
            <UserIcon size={20} /> Profile
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-100 space-y-4">
          <button
            onClick={onOpenCreate}
            className="w-full flex items-center justify-center gap-2 bg-rose-600 text-white rounded-xl p-3 hover:bg-rose-700 transition-all font-semibold shadow-md active:scale-95"
          >
            <PlusCircle size={20} /> Publish Post
          </button>

          <div className="flex items-center gap-3 px-2 py-3">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold text-gray-900 truncate">
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-xs text-rose-500 hover:text-rose-700 text-left flex items-center gap-1"
              >
                <LogOut size={12} /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glassmorphism rounded-t-3xl z-50 flex justify-around items-center p-4 pb-safe border-t border-white/40">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => { triggerHaptic(); navigate("/dashboard"); }}
          className="p-2 text-primary hover:bg-bgLight rounded-xl transition-colors"
        >
          <Home size={28} />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => { triggerHaptic(); navigate("/my-requests"); }}
          className="p-2 text-gray-400 hover:text-primary hover:bg-bgLight rounded-xl transition-colors"
        >
          <History size={28} />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => { triggerHaptic(); navigate("/analytics"); }}
          className="p-2 text-gray-400 hover:text-primary hover:bg-bgLight rounded-xl transition-colors"
        >
          <TrendingUp size={28} />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => { triggerHaptic(); onOpenCreate(); }}
          className="p-4 -mt-8 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-lg shadow-primary/30 transition-all border-4 border-white"
        >
          <PlusCircle size={32} />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => { triggerHaptic(); navigate("/messages"); }}
          className="p-2 text-gray-400 hover:text-primary hover:bg-bgLight rounded-xl transition-colors relative"
        >
          <MessageSquare size={28} />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-cta rounded-full border-2 border-white"></span>
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.85 }}
          onClick={() => { triggerHaptic(); navigate("/profile"); }}
          className="p-2 text-gray-400 hover:text-primary hover:bg-bgLight rounded-xl transition-colors relative"
        >
          <UserIcon size={28} />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={handleLogout}
          className="p-2 text-gray-400 hover:text-primary hover:bg-bgLight rounded-xl transition-colors"
        >
          <LogOut size={28} />
        </motion.button>
      </div>
    </>
  );
};

export default Sidebar;
