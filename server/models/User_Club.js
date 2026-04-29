import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User_Club = sequelize.define('User_Club', {
  club_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  club_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'User_Clubs',
  timestamps: true,
});

export default User_Club;
