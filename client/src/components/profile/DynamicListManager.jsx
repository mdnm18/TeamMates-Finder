import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Briefcase, Users, Code, Award } from 'lucide-react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const IconMap = {
  experience: Briefcase,
  club: Users,
  community: Award,
  tool: Code,
};

const DynamicListManager = ({ title, type, items, onUpdate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({});
  const { token } = useSelector((state) => state.auth);

  const Icon = IconMap[type] || Plus;

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      if (navigator.vibrate) navigator.vibrate(50);
      const res = await axios.post(
        '/api/users/profile/item',
        { modelType: type, data: formData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      setIsAdding(false);
      setFormData({});
      onUpdate();
    } catch (error) {
      toast.error('Failed to add item');
      console.error(error);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
      await axios.delete(`/api/users/profile/item/${type}/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Item removed');
      onUpdate();
    } catch (error) {
      toast.error('Failed to remove item');
      console.error(error);
    }
  };

  const renderFormFields = () => {
    if (type === 'experience') {
      return (
        <>
          <input className="input-field" placeholder="Company Name" onChange={(e) => setFormData({ ...formData, company_name: e.target.value })} required />
          <input className="input-field mt-2" placeholder="Designation" onChange={(e) => setFormData({ ...formData, designation: e.target.value })} required />
          <div className="flex gap-2 mt-2">
            <input className="input-field" type="date" onChange={(e) => setFormData({ ...formData, from_date: e.target.value })} required />
            <input className="input-field" type="date" onChange={(e) => setFormData({ ...formData, to_date: e.target.value })} />
          </div>
        </>
      );
    }
    if (type === 'club' || type === 'community') {
      return (
        <>
          <input className="input-field" placeholder="Name" onChange={(e) => setFormData({ ...formData, [type === 'club' ? 'club_name' : 'community_name']: e.target.value })} required />
          <input className="input-field mt-2" placeholder="Position" onChange={(e) => setFormData({ ...formData, position: e.target.value })} />
          {type === 'community' && <input className="input-field mt-2" placeholder="Location" onChange={(e) => setFormData({ ...formData, location: e.target.value })} />}
        </>
      );
    }
    if (type === 'tool') {
      return <input className="input-field" placeholder="Tool Name (e.g. React, Figma)" onChange={(e) => setFormData({ ...formData, tool_name: e.target.value })} required />;
    }
    return null;
  };

  return (
    <div className="glassmorphism p-6 rounded-3xl mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold flex items-center gap-2"><Icon size={24} className="text-primary" /> {title}</h3>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsAdding(!isAdding)} className="p-2 bg-rose-50 text-primary rounded-full hover:bg-rose-100 transition-colors">
          {isAdding ? <X size={20} /> : <Plus size={20} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAdd}
            className="mb-6 bg-white/50 p-4 rounded-2xl border border-gray-100"
          >
            {renderFormFields()}
            <motion.button whileTap={{ scale: 0.95 }} type="submit" className="mt-4 w-full bg-primary text-white p-3 rounded-xl font-semibold shadow-md">Save {title}</motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        <AnimatePresence>
          {items?.map((item) => {
            const itemId = item.exp_id || item.club_id || item.comm_id || item.tool_id;
            const titleText = item.company_name || item.club_name || item.community_name || item.tool_name;
            const subText = item.designation || item.position || '';
            
            return (
              <motion.div
                key={itemId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="flex justify-between items-center bg-white/80 p-4 rounded-2xl border border-gray-100 shadow-sm"
              >
                <div>
                  <h4 className="font-bold text-gray-800">{titleText}</h4>
                  {subText && <p className="text-sm text-gray-500">{subText}</p>}
                </div>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleRemove(itemId)} className="text-gray-400 hover:text-red-500 p-2">
                  <X size={18} />
                </motion.button>
              </motion.div>
            );
          })}
        </AnimatePresence>
        {(!items || items.length === 0) && !isAdding && (
          <p className="text-gray-400 text-sm text-center py-4">No {title.toLowerCase()} added yet.</p>
        )}
      </div>
    </div>
  );
};

export default DynamicListManager;
