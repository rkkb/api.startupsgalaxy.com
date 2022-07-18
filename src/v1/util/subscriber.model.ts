import { DataTypes } from 'sequelize';
import sequelize from '@config/mySql';

const SubscriberModel = sequelize.define(
  'subscribers',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeIndex',
    },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      onUpdate: 'SET DEFAULT',
      defaultValue: DataTypes.NOW,
    },
  },
  // { indexes: [{ unique: true, fields: ["email"] }] }
);

export default SubscriberModel;
