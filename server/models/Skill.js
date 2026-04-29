import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Skill = sequelize.define('Skill', {
  skill_name: {
    type: DataTypes.STRING,
    primaryKey: true,
  }
}, {
  tableName: 'Skills',
  timestamps: false,
});

export default Skill;
