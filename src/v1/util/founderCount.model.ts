import { DataTypes } from 'sequelize';
import sequelize from '@config/mySql';

const FounderCountModel = sequelize.define(
  'founderCount',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      onUpdate: 'SET DEFAULT',
      defaultValue: DataTypes.NOW,
    },
  },
  { indexes: [{ unique: true, fields: ['value'] }] },
);

export default FounderCountModel;
