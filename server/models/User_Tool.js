import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User_Tool = sequelize.define('User_Tool', {
  tool_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  tool_name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'User_Tools',
  timestamps: true,
});

export default User_Tool;
