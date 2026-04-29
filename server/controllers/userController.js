import { User, User_Experience, User_Club, User_Community, User_Tool } from '../models/index.js';

export const getProfile = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { email: req.user.email },
            include: [
                { model: User_Experience, as: 'experiences' },
                { model: User_Club, as: 'clubs' },
                { model: User_Community, as: 'communities' },
                { model: User_Tool, as: 'tools' }
            ]
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Internal Server Error fetching profile' });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { section, current_year, cgpa, degree, specialization, native_location, personal_email, phone_number, qr_code_url, github_url, linkedin_url } = req.body;
        
        const [updatedRowsCount] = await User.update(
            { section, current_year, cgpa, degree, specialization, native_location, personal_email, phone_number, qr_code_url, github_url, linkedin_url },
            { where: { email: req.user.email } }
        );

        if (updatedRowsCount === 0) {
            return res.status(404).json({ error: 'User not found or no changes made' });
        }

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal Server Error updating profile' });
    }
};

// Generic Add/Remove Handlers for Arrays
export const addProfileItem = async (req, res) => {
    try {
        const { modelType, data } = req.body;
        const user = await User.findOne({ where: { email: req.user.email } });
        
        if (!user) return res.status(404).json({ error: 'User not found' });

        let result;
        switch (modelType) {
            case 'experience':
                result = await User_Experience.create({ ...data, user_id: user.user_id });
                break;
            case 'club':
                result = await User_Club.create({ ...data, user_id: user.user_id });
                break;
            case 'community':
                result = await User_Community.create({ ...data, user_id: user.user_id });
                break;
            case 'tool':
                result = await User_Tool.create({ ...data, user_id: user.user_id });
                break;
            default:
                return res.status(400).json({ error: 'Invalid model type' });
        }
        res.status(201).json({ message: `${modelType} added successfully`, item: result });
    } catch (error) {
        console.error(`Error adding item:`, error);
        res.status(500).json({ error: 'Internal Server Error adding profile item' });
    }
};

export const removeProfileItem = async (req, res) => {
    try {
        const { modelType, itemId } = req.params;
        const user = await User.findOne({ where: { email: req.user.email } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        let deletedRowsCount;
        switch (modelType) {
            case 'experience':
                deletedRowsCount = await User_Experience.destroy({ where: { exp_id: itemId, user_id: user.user_id } });
                break;
            case 'club':
                deletedRowsCount = await User_Club.destroy({ where: { club_id: itemId, user_id: user.user_id } });
                break;
            case 'community':
                deletedRowsCount = await User_Community.destroy({ where: { comm_id: itemId, user_id: user.user_id } });
                break;
            case 'tool':
                deletedRowsCount = await User_Tool.destroy({ where: { tool_id: itemId, user_id: user.user_id } });
                break;
            default:
                return res.status(400).json({ error: 'Invalid model type' });
        }

        if (deletedRowsCount === 0) {
            return res.status(404).json({ error: 'Item not found or unauthorized' });
        }

        res.status(200).json({ message: `${modelType} removed successfully` });
    } catch (error) {
        console.error(`Error removing item:`, error);
        res.status(500).json({ error: 'Internal Server Error removing profile item' });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['user_id', 'name', 'department', 'email']
        });
        
        // Filter out the currently logged-in user
        const otherUsers = users.filter(u => u.email !== req.user.email);
        
        res.status(200).json(otherUsers);
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ error: 'Internal Server Error fetching users' });
    }
};
