const express = require("express");
const Router = express.Router();
const { User, Post, Comment } = require("../models");

Router.get("/posts", async (req, res) => {
  try {
    let posts = await Post.findAll({
      include: [
        {
          model: User,
          as: "author",
          attributes: ["user_id", "name", "email"],
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["comment_id", "text", "user_id"],
          include: {
            model: User,
            as: "author",
            attributes: ["user_id", "name", "email"],
          },
        },
      ],
    });
    res.status(200).json({
      message: "Posts retrieved successfully",
      posts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = Router;
