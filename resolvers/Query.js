const { User, Post, Comment } = require("../models");

exports.Query = {
  users: async (parent, args, { res, token, checkAuth }) => {
    try {
      await checkAuth(token);
      return await User.findAll();
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  user: async (parent, { user_id }, { res, token, checkAuth }) => {
    try {
      let user = await checkAuth(token);
      return await User.findByPk(user);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  posts: async (parent, args, { res, checkAuth, token }) => {
    try {
      await checkAuth(token);
      return await Post.findAll();
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  post: async (parent, { post_id }, { res, checkAuth, token }) => {
    try {
      await checkAuth(token);
      return await Post.findByPk(post_id);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  comments: async (parent, args, { res, checkAuth, token }) => {
    try {
      await checkAuth(token);
      return await Comment.findAll();
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  comment: async (parent, { comment_id }, { res, checkAuth, token }) => {
    try {
      await checkAuth(token);
      return await Comment.findByPk(comment_id);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};
