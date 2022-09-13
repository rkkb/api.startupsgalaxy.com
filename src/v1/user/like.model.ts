import { DataTypes } from 'sequelize';
import sequelize from '@config/mySql';
import UserModel from '@user/user.model';
import StartupModel from '../startup/startup.model';
import InvestorModel from '../investor/investor.model';
import DealModel from '../deal/deal.model';

const LikeModel = sequelize.define('likes', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  likedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  startupId: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  investorId: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  dealId: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  createdAt: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
  updatedAt: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    onUpdate: 'SET DEFAULT',
    defaultValue: DataTypes.NOW,
  },
});

LikeModel.belongsTo(UserModel, {
  foreignKey: 'likedBy',
  onDelete: 'CASCADE',
});

LikeModel.belongsTo(StartupModel, {
  foreignKey: 'startupId',
  onDelete: 'CASCADE',
});

LikeModel.belongsTo(InvestorModel, {
  foreignKey: 'investorId',
  onDelete: 'CASCADE',
});

LikeModel.belongsTo(DealModel, {
  foreignKey: 'dealId',
  onDelete: 'CASCADE',
});

export default LikeModel;
