import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User_Experience = sequelize.define('User_Experience', {
  exp_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  from_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  to_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  }
}, {
  tableName: 'User_Experiences',
  timestamps: true,
});

export default User_Experience;
