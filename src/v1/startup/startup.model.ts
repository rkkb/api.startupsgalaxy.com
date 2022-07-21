import { DataTypes } from 'sequelize';
import sequelize from '@config/mySql';
import UserModel from '@user/user.model';
import DealCategoryModel from '@util/dealCategory.model';
import IndustryModel from '@util/industry.model';
import FounderCountModel from '@util/founderCount.model';
import TeamSizeModel from '@util/teamSize.model';
import StageModel from '@util/stage.model';

const StartupModel = sequelize.define('startup', {
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
  mobile: { type: DataTypes.STRING, allowNull: false },

  category: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  playStore: {
    type: DataTypes.STRING,
  },
  appStore: {
    type: DataTypes.STRING,
  },

  industryType: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  founderType: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  teamSizeType: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stageType: {
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

StartupModel.belongsTo(UserModel, {
  foreignKey: 'createdBy',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

StartupModel.belongsTo(DealCategoryModel, {
  foreignKey: 'category',
});

StartupModel.belongsTo(IndustryModel, {
  foreignKey: 'industryType',
});

StartupModel.belongsTo(FounderCountModel, {
  foreignKey: 'founderType',
});

StartupModel.belongsTo(TeamSizeModel, {
  foreignKey: 'teamSizeType',
});
StartupModel.belongsTo(StageModel, {
  foreignKey: 'stageType',
});

export default StartupModel;
