import { DataTypes } from 'sequelize';
import sequelize from '@config/mySql';
import UserModel from '@user/user.model';
import StartupModel from '../startup/startup.model';
import InvestorModel from '../investor/investor.model';
import DealModel from '../deal/deal.model';

const ViewModel = sequelize.define('views', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  viewBy: {
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

ViewModel.belongsTo(UserModel, {
  foreignKey: 'viewBy',
  onDelete: 'CASCADE',
});

ViewModel.belongsTo(StartupModel, {
  foreignKey: 'startupId',
  onDelete: 'CASCADE',
});

ViewModel.belongsTo(InvestorModel, {
  foreignKey: 'investorId',
  onDelete: 'CASCADE',
});

ViewModel.belongsTo(DealModel, {
  foreignKey: 'dealId',
  onDelete: 'CASCADE',
});

export default ViewModel;
