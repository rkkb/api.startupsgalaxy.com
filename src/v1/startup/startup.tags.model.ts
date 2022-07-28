import { DataTypes } from 'sequelize';
import sequelize from '@config/mySql';
import TagModel from '@util/tag.model';

const StartupTagModel = sequelize.define(
  'startupTags',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    startupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tagId: {
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
);

StartupTagModel.belongsTo(TagModel, {
  foreignKey: 'tagId',
});

export default StartupTagModel;
