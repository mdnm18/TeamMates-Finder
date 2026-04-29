import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Request = sequelize.define('Request', {
  request_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  pitch_message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Accepted', 'Rejected'),
    defaultValue: 'Pending',
  }
}, {
  tableName: 'Requests',
  timestamps: true,
});

export default Request;
