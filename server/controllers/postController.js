import { Post, Skill, User, sequelize } from '../models/index.js';

export const createPost = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { title, description, type, vacancies, skills } = req.body;
        
        // Find DB user by email bound from JWT
        const user = await User.findOne({ where: { email: req.user.email }});
        if (!user) {
            return res.status(404).json({ error: 'User mapping not found' });
        }

        const newPost = await Post.create({
            title,
            description,
            type,
            vacancies,
            author_id: user.user_id,
            status: 'Open'
        }, { transaction });

        if (skills && Array.isArray(skills) && skills.length > 0) {
            // Upsert skills individually
            const skillRecords = skills.map(s => ({ skill_name: s.trim() }));
            await Skill.bulkCreate(skillRecords, { ignoreDuplicates: true, transaction });
            
            const dbSkills = await Skill.findAll({ 
                where: { skill_name: skills.map(s => s.trim()) },
                transaction 
            });
            await newPost.addSkills(dbSkills, { transaction });
        }

        await transaction.commit();
        res.status(201).json({ message: 'Post generated successfully', post: newPost });
    } catch (error) {
        await transaction.rollback();
        console.error('Post creation error:', error);
        res.status(500).json({ error: 'Internal Server Error crafting post' });
    }
};

export const getPosts = async (req, res) => {
    try {
        const { type, skill } = req.query;
        let whereClause = { status: 'Open' };
        
        if (type) {
            whereClause.type = type;
        }

        let includeStrategy = [
            {
                model: User,
                attributes: ['user_id', 'name', 'department', 'avg_rating']
            },
            {
                model: Skill,
                where: skill ? { skill_name: skill } : undefined,
                through: { attributes: [] } // cleaner payload, excludes junction metadata
            }
        ];

        const posts = await Post.findAll({
            where: whereClause,
            include: includeStrategy,
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json(posts);
    } catch (error) {
        console.error('Fetch posts error:', error);
        res.status(500).json({ error: 'Internal Server Error fetching feed' });
    }
};
