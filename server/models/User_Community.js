import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User_Community = sequelize.define('User_Community', {
  comm_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  community_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'User_Communities',
  timestamps: true,
});

export default User_Community;
