import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      // Validation to enforce @srmist.edu.in can also be run in business logic
    }
  },
  registration_no: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true, // Nullable initially until onboarding?
  },
  department: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  github_url: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    }
  },
  linkedin_url: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    }
  },
  section: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  current_year: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  cgpa: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: true,
  },
  degree: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  native_location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  personal_email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    }
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  qr_code_url: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    }
  },
  avg_rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0.00,
  }
}, {
  tableName: 'Users',
  timestamps: true,
});

export default User;
