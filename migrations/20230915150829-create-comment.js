"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("comments", {
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("comments");
  },
};
