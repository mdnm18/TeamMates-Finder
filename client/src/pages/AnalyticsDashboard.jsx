import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Download, TrendingUp, BarChart2, PieChart as PieChartIcon } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import html2pdf from 'html2pdf.js';
import { toast } from 'react-toastify';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar
} from 'recharts';

const COLORS = ['#DC2626', '#EF4444', '#F87171', '#FCA5A5', '#FEE2E2'];

const AnalyticsDashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const [appStats, setAppStats] = useState([]);
  const [profileViews, setProfileViews] = useState([]);
  const [skillDemand, setSkillDemand] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [statsRes, viewsRes, skillsRes] = await Promise.all([
          axios.get('/api/analytics/applications', { headers }),
          axios.get('/api/analytics/views', { headers }),
          axios.get('/api/analytics/skills', { headers })
        ]);
        setAppStats(statsRes.data);
        setProfileViews(viewsRes.data);
        setSkillDemand(skillsRes.data);
      } catch (error) {
        console.error('Failed to fetch analytics', error);
        toast.error('Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [token]);

  const handleExportPDF = () => {
    toast.info('Opening Print Dialog. Save as PDF!', { autoClose: 3000 });
    setTimeout(() => {
        window.print();
    }, 500);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-bgLight">Loading Analytics...</div>;

  return (
    <div className="flex min-h-screen bg-bgLight">
      <Sidebar />
      <div className="flex-1 p-4 md:p-10 lg:pl-16 relative">
        <div className="max-w-7xl mx-auto z-10 relative pb-24 md:pb-0" id="analytics-report">
          
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              <TrendingUp className="text-primary" size={36} /> Analytics Hub
            </h1>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={handleExportPDF}
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-colors"
            >
              <Download size={18} /> Export PDF
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Line Chart: Profile Views */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="glassmorphism p-6 rounded-3xl col-span-1 lg:col-span-2"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                <TrendingUp size={20} className="text-primary"/> Profile Views (Last 7 Days)
              </h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={profileViews} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="views" stroke="#DC2626" strokeWidth={4} dot={{ r: 6, fill: '#DC2626', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Pie Chart: Applications */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="glassmorphism p-6 rounded-3xl flex flex-col items-center"
            >
              <h3 className="text-xl font-bold mb-4 w-full flex items-center gap-2 text-gray-800">
                <PieChartIcon size={20} className="text-primary"/> Application Success
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={appStats.length ? appStats : [{name: 'No Data', value: 1}]}
                      cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}
                      dataKey="value" stroke="none"
                    >
                      {(appStats.length ? appStats : [{name: 'No Data', value: 1}]).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Bar Chart: Skill Demand */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="glassmorphism p-6 rounded-3xl"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                <BarChart2 size={20} className="text-primary"/> Campus Skill Demand
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillDemand} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontWeight: 600}} width={80} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="demand" fill="#DC2626" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

          </div>
          
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={handleExportPDF}
            className="md:hidden mt-8 w-full flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 text-white rounded-xl font-bold shadow-lg"
          >
            <Download size={18} /> Download Analytics Report
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
