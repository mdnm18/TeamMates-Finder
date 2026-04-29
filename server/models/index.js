import sequelize from '../config/db.js';
import User from './User.js';
import Post from './Post.js';
import Request from './Request.js';
import Notification from './Notification.js';
import Skill from './Skill.js';
import User_Experience from './User_Experience.js';
import User_Club from './User_Club.js';
import User_Community from './User_Community.js';
import User_Tool from './User_Tool.js';
import Message from './Message.js';

// User <-> Post (One to Many)
User.hasMany(Post, { foreignKey: 'author_id', onDelete: 'CASCADE' });
Post.belongsTo(User, { foreignKey: 'author_id' });

// User Profile Arrays (One to Many)
User.hasMany(User_Experience, { foreignKey: 'user_id', onDelete: 'CASCADE', as: 'experiences' });
User_Experience.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(User_Club, { foreignKey: 'user_id', onDelete: 'CASCADE', as: 'clubs' });
User_Club.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(User_Community, { foreignKey: 'user_id', onDelete: 'CASCADE', as: 'communities' });
User_Community.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(User_Tool, { foreignKey: 'user_id', onDelete: 'CASCADE', as: 'tools' });
User_Tool.belongsTo(User, { foreignKey: 'user_id' });

// User <-> Skill (Many to Many through User_Skills)
User.belongsToMany(Skill, { through: 'User_Skills', foreignKey: 'user_id', timestamps: false });
Skill.belongsToMany(User, { through: 'User_Skills', foreignKey: 'skill_name', timestamps: false });

// Post <-> Skill (Many to Many through Post_Skills)
Post.belongsToMany(Skill, { through: 'Post_Skills', foreignKey: 'post_id', timestamps: false });
Skill.belongsToMany(Post, { through: 'Post_Skills', foreignKey: 'skill_name', timestamps: false });

// Request Associations
Request.belongsTo(Post, { foreignKey: 'post_id', onDelete: 'CASCADE' });
Request.belongsTo(User, { as: 'Sender', foreignKey: 'sender_id', onDelete: 'CASCADE' });
Request.belongsTo(User, { as: 'Receiver', foreignKey: 'receiver_id', onDelete: 'CASCADE' });

// Notification Associations
Notification.belongsTo(User, { as: 'Recipient', foreignKey: 'recipient_id', onDelete: 'CASCADE' });
Notification.belongsTo(User, { as: 'Sender', foreignKey: 'sender_id', onDelete: 'SET NULL' });

// Message Associations
Message.belongsTo(User, { as: 'Sender', foreignKey: 'sender_id', onDelete: 'CASCADE' });
Message.belongsTo(User, { as: 'Receiver', foreignKey: 'receiver_id', onDelete: 'CASCADE' });
Message.belongsTo(Post, { foreignKey: 'post_id', onDelete: 'SET NULL' });

export {
  sequelize,
  User,
  Post,
  Request,
  Notification,
  Skill,
  User_Experience,
  User_Club,
  User_Community,
  User_Tool,
  Message
};
