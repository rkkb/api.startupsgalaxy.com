import { DataTypes } from 'sequelize';
import sequelize from '@config/mySql';
import CountryModel from '@util/country.model';

const UserModel = sequelize.define(
  'users',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeIndex',
    },
    password: {
      type: DataTypes.STRING,
    },
    logo: {
      type: DataTypes.STRING,
    },
    about: {
      type: DataTypes.STRING,
    },
    countryId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    mobile: { type: DataTypes.STRING },
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

UserModel.belongsTo(CountryModel, {
  foreignKey: 'countryId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
});

export default UserModel;
