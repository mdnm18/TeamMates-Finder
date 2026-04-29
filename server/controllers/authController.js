import { User, Skill, sequelize } from '../models/index.js';

export const login = async (req, res) => {
    try {
        const { email } = req.user; // Appended by middleware
        
        const existingUser = await User.findOne({ where: { email } });
        
        if (existingUser) {
            // User exists, they can proceed to dashboard
            return res.status(200).json({ 
                isNewUser: false, 
                user: existingUser 
            });
        } else {
            // User does not exist, send to onboarding
            return res.status(200).json({
                isNewUser: true,
                email: email,
                name: req.user.name,
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const onboardUser = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { email, name } = req.user; // Verified via token
        const { registration_no, department, github_url, linkedin_url, skills } = req.body;
        
        // 1. Create User
        const newUser = await User.create({
            name,
            email,
            registration_no,
            department,
            github_url,
            linkedin_url
        }, { transaction });

        // 2. Handle Skills mapping
        if (skills && Array.isArray(skills) && skills.length > 0) {
            // Upsert skills
            // To ensure uniqueness, we bulkCreate with ignoreDuplicates (MySQL feature wrapper)
            const skillRecords = skills.map(s => ({ skill_name: s.trim() }));
            await Skill.bulkCreate(skillRecords, { ignoreDuplicates: true, transaction });
            
            // Re-fetch skill instances to associate
            const dbSkills = await Skill.findAll({ 
                where: { skill_name: skills.map(s => s.trim()) },
                transaction 
            });
            
            // Add associations in User_Skills junction
            await newUser.addSkills(dbSkills, { transaction });
        }

        await transaction.commit();
        
        res.status(201).json({
            message: 'User successfully onboarded',
            user: newUser
        });
    } catch (error) {
        await transaction.rollback();
        console.error('Onboarding transaction error:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
             return res.status(400).json({ error: 'Email or Registration Number already exists.' });
        }
        res.status(500).json({ error: 'Failed to onboard user.' });
    }
};
