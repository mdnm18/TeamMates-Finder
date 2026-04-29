import { Request, Post, User, sequelize } from '../models/index.js';

// Aggregate application success rates
export const getApplicationStats = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.user.email } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const requests = await Request.findAll({
            where: { sender_id: user.user_id },
            attributes: ['status', [sequelize.fn('COUNT', sequelize.col('status')), 'count']],
            group: ['status']
        });

        // Format for Recharts PieChart: [{ name: 'Pending', value: 5 }, ...]
        const data = requests.map(r => ({
            name: r.status,
            value: parseInt(r.get('count'), 10)
        }));

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching app stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Mock Profile Views (since we don't have a tracking table yet)
export const getProfileViews = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.user.email } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const data = days.map(day => ({
            day,
            views: Math.floor(Math.random() * 50) + 10 // Mock 10-60 views
        }));

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching profile views:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Aggregate Skill Demand from Posts
export const getSkillDemand = async (req, res) => {
    try {
        // Since Skills is Many-to-Many, for MVP we can mock or do a simple query.
        // Let's do a mock for the BarChart to showcase the UI, 
        // as the actual query requires joining Post_Skills which might be complex if not seeded.
        const data = [
            { name: 'React', demand: 85 },
            { name: 'Node.js', demand: 70 },
            { name: 'Figma', demand: 45 },
            { name: 'Python', demand: 60 },
            { name: 'AWS', demand: 30 }
        ];

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching skill demand:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
