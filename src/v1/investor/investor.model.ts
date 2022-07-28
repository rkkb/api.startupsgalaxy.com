import { DataTypes } from 'sequelize';
import sequelize from '@config/mySql';
import UserModel from '@user/user.model';
import IndustryModel from '@util/industry.model';

const InvestorModel = sequelize.define('investor', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  headline: { type: DataTypes.STRING, allowNull: false },
  details: { type: DataTypes.STRING, allowNull: false },
  logo: { type: DataTypes.STRING, allowNull: false },
  websiteLink: { type: DataTypes.STRING, allowNull: false },
  mobile: { type: DataTypes.STRING },

  industryType: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foundedYear: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  linkedin: {
    type: DataTypes.STRING,
  },
  twitter: {
    type: DataTypes.STRING,
  },
  instagram: {
    type: DataTypes.STRING,
  },
  facebook: {
    type: DataTypes.STRING,
  },
  img1: {
    type: DataTypes.STRING,
  },
  img2: {
    type: DataTypes.STRING,
  },
  img3: {
    type: DataTypes.STRING,
  },
  img4: {
    type: DataTypes.STRING,
  },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    onUpdate: 'SET DEFAULT',
    defaultValue: DataTypes.NOW,
  },
});

InvestorModel.belongsTo(UserModel, {
  foreignKey: 'createdBy',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

InvestorModel.belongsTo(IndustryModel, {
  foreignKey: 'industryType',
});

export default InvestorModel;
