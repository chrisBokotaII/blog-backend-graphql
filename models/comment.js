"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, User }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: "user_id",
        as: "author",
      });
      this.belongsTo(Post, {
        foreignKey: "post_id",
        as: "post",
      });
    }
  }
  Comment.init(
    {
      comment_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "text is required" },
          notEmpty: { msg: "text is required" },
          min: [3, "text must be at least 3 characters"],
          max: [100, "text must be at most 100 characters"],
        },
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      post_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      tableName: "comments",
      modelName: "Comment",
    }
  );
  return Comment;
};
