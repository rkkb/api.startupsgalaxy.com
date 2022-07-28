import { DataTypes } from 'sequelize';
import sequelize from '@config/mySql';
import UserModel from '@user/user.model';
import DealCategoryModel from '@util/dealCategory.model';

const DealModel = sequelize.define('deals', {
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
  expirationDate: { type: DataTypes.STRING, allowNull: false },
  category: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  termsConditions: { type: DataTypes.STRING, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    onUpdate: 'SET DEFAULT',
    defaultValue: DataTypes.NOW,
  },
});

DealModel.belongsTo(UserModel, {
  foreignKey: 'createdBy',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

DealModel.belongsTo(DealCategoryModel, {
  foreignKey: 'category',
});

export default DealModel;
