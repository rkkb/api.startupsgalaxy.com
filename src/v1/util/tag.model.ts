import { DataTypes } from 'sequelize';
import sequelize from '@config/mySql';

const TagModel = sequelize.define(
  'tags',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
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
  { indexes: [{ unique: true, fields: ['name'] }] },
);

export default TagModel;
