import { Post, Request, User, sequelize } from '../models/index.js';
import NotificationEngine from '../services/NotificationService.js';

export const sendRequest = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { postId } = req.params;
        const { pitch_message } = req.body;
        
        // Find sender user from JWT tracking
        const sender = await User.findOne({ where: { email: req.user.email }, transaction });
        if (!sender) throw new Error("Sender user not mapped");

        // [DBMS Lock Implementation]: Fetch Target Post mapping strict Row-Level Update Lock.
        // The query natively forces concurrent DB operations to line up sequentially.
        const post = await Post.findByPk(postId, {
            lock: transaction.LOCK.UPDATE,
            transaction
        });

        if (!post) {
            await transaction.rollback();
            return res.status(404).json({ error: 'Target post not found' });
        }

        if (post.status !== 'Open' || post.vacancies <= 0) {
            await transaction.rollback();
            return res.status(400).json({ error: 'Post is no longer accepting applications' });
        }

        if (post.author_id === sender.user_id) {
            await transaction.rollback();
            return res.status(400).json({ error: 'Cannot apply to your own post' });
        }

        // Check for duplicate application
        const existingReq = await Request.findOne({
            where: { post_id: post.post_id, sender_id: sender.user_id },
            transaction
        });

        if (existingReq) {
            await transaction.rollback();
            return res.status(400).json({ error: 'Application already filed for this post' });
        }

        const requestRecord = await Request.create({
            post_id: post.post_id,
            sender_id: sender.user_id,
            receiver_id: post.author_id,
            pitch_message: pitch_message || null,
            status: 'Pending'
        }, { transaction });

        await transaction.commit();
        
        // Trigger structural notification post-commit
        NotificationEngine.emitNotification(
            post.author_id,
            'Request_Sent',
            `${sender.name} has explicitly applied to your post: "${post.title}".`
        );

        res.status(201).json({ message: 'Request delivered cleanly', request: requestRecord });
    } catch (error) {
        await transaction.rollback();
        console.error('Request creation sequence fault:', error);
        res.status(500).json({ error: 'Internal Server Error crafting sequence' });
    }
};

export const handleRequest = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { requestId } = req.params;
        const { action } = req.body; // 'Accept' or 'Reject'

        if (!['Accept', 'Reject'].includes(action)) {
            await transaction.rollback();
            return res.status(400).json({ error: "Invalid action paradigm" });
        }

        const receiver = await User.findOne({ where: { email: req.user.email }, transaction });
        if(!receiver) throw new Error("Mapped logged in user invalid");

        // [DBMS Lock Implementation]: Pull request and linked post tracking to lock updates globally.
        const requestNode = await Request.findByPk(requestId, {
            include: [{ model: Post }],
            lock: transaction.LOCK.UPDATE,
            transaction
        });

        if (!requestNode) {
            await transaction.rollback();
            return res.status(404).json({ error: 'Target mapped request missing' });
        }

        // Validate that logged in user is actually the receiver mapped to the node.
        if (requestNode.receiver_id !== receiver.user_id) {
            await transaction.rollback();
            return res.status(403).json({ error: 'Unauthorized to parse this application' });
        }

        if (requestNode.status !== 'Pending') {
            await transaction.rollback();
            return res.status(400).json({ error: 'Request is already resolved.' });
        }

        if (action === 'Reject') {
            requestNode.status = 'Rejected';
            await requestNode.save({ transaction });
        } else if (action === 'Accept') {
            const post = requestNode.Post;
            if (post.vacancies <= 0 || post.status !== 'Open') {
                await transaction.rollback();
                return res.status(400).json({ error: 'Cannot accept request. Post vacancies full.' });
            }

            requestNode.status = 'Accepted';
            await requestNode.save({ transaction });

            post.vacancies -= 1;
            if (post.vacancies === 0) {
                post.status = 'Closed';
            }
            await post.save({ transaction });
        }

        await transaction.commit();
        
        // Dispatch explicit target alerts towards sender post-commit
        const contentMessage = action === 'Accept' 
            ? `Fantastic! ${receiver.name} has Accepted your pitch for "${requestNode.Post.title}".`
            : `${receiver.name} declined your pitch for "${requestNode.Post.title}". Keep trying!`;
            
        NotificationEngine.emitNotification(
            requestNode.sender_id,
            action === 'Accept' ? 'Request_Accepted' : 'Request_Rejected',
            contentMessage
        );

        res.status(200).json({ message: `Request efficiently mapped to state: ${action}` });
    } catch (error) {
        await transaction.rollback();
        console.error('Request mutation collision:', error);
        res.status(500).json({ error: 'Internal Server Error handling mutation matrix' });
    }
};

export const getUserRequests = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.user.email }});
        if (!user) return res.status(404).json({ error: 'System user map invalid' });

        // Build comprehensive incoming vs outgoing payload natively pulling relationships.
        const incoming = await Request.findAll({
            where: { receiver_id: user.user_id },
            include: [
                { model: Post, attributes: ['title', 'type'] },
                { model: User, as: 'Sender', attributes: ['name', 'department'] } // Wait, Skills requires separate mapping, but omitting it for generic payload speed.
            ],
            order: [['createdAt', 'DESC']]
        });

        const outgoing = await Request.findAll({
            where: { sender_id: user.user_id },
            include: [
                { model: Post, attributes: ['title', 'type', 'status'] },
                { model: User, as: 'Receiver', attributes: ['name', 'department'] }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({ incoming, outgoing });
    } catch (error) {
        console.error('Fetch requests extraction fail:', error);
        res.status(500).json({ error: 'Internal Server Error aggregating request states' });
    }
};
