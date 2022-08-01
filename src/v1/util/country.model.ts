import { DataTypes } from 'sequelize';
import sequelize from '@config/mySql';

const CountryModel = sequelize.define(
  'countries',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeIndex',
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
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
);

export default CountryModel;
