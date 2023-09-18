"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Comment }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: "user_id",
        as: "author",
      });
      this.hasMany(Comment, {
        foreignKey: "post_id",
        as: "comments",
      });
    }
  }
  post.init(
    {
      post_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notEmpty: { msg: "title is required" },
          min: [3, "title must be at least 3 characters"],
        },
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "content is required" },
          min: [10, "content must be at least 3 characters"],
        },
      },
      published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      tableName: "posts",
      modelName: "Post",
    }
  );
  return post;
};
