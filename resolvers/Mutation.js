const { v4 } = require("uuid");
const bcrypt = require("bcrypt");
const encrpt = require("../helpers/encrpt");

const { User, Post, Comment } = require("../models");
const e = require("express");
exports.Mutation = {
  async createUser(parent, { name, email, password }, { res }) {
    try {
      const passwordHash = await encrpt.hashPassword(password);
      const user = await User.create({
        user_id: v4(),
        name,
        email,
        password: passwordHash,
      });
      if (!user) {
        return res.status(400).send({ message: "User creation failed." });
      }
      const token = encrpt.generateToken({ user_id: user.user_id });
      return res.status(200).json({
        user,
        token,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  async login(parent, { email, password }, { res }, info) {
    try {
      const user = await User.findOne({ where: { email } });

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch || !user) {
        return res.status(400).send({ message: "invalide email or password" });
      }
      const token = encrpt.generateToken({ user_id: user.user_id });
      return {
        name: user.name,
        email: user.email,
        password: user.password,

        token,
      };
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },
  async createPost(parent, { input }, { token, checkAuth, res }, info) {
    const { title, content, published } = input;

    try {
      let user = await checkAuth(token);

      const newpost = await Post.create({
        id: v4(),
        title,
        content,
        published,
        user_id: user,
      });

      return newpost;
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  async updatePost(parent, { input }, { token, checkAuth, res }) {
    console.log("args", input);
    const { post_id, title, content, published } = input;

    try {
      // Verify user authentication
      const user = await checkAuth(token);

      // Find the post by its ID
      const post = await Post.findByPk(post_id);

      if (!post) {
        res.status(400).send({ message: "Post not found." });
      }

      // Check if the user is authorized to update this post
      if (post.user_id !== user) {
        res
          .status(400)
          .send({ message: "Not authorized to update this post." });
      }

      // Update the post
      const updatedPost = await post.update({
        title,
        content,
        published,
      });

      return updatedPost;
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  async deletePost(_, args, { token, checkAuth, res }) {
    const { post_id } = args;

    try {
      const user = await checkAuth(token);

      // Find the post by its ID
      const post = await Post.findByPk(post_id);

      if (!post) {
        res.status(400).send({ message: "Post not found." });
      }

      // Check if the user is authorized to delete this post
      if (post.user_id !== user) {
        res
          .status(400)
          .send({ message: "Not authorized to delete this post." });
      }

      // Delete the post
      const deletedPost = await post.destroy();
      if (!deletedPost) {
        res.status(400).send({ message: "Post deletion failed." });
      }

      return true;
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  async createComment(parent, { text, post_id }, { token, checkAuth, res }) {
    try {
      const user = await checkAuth(token);
      if (!user) {
        res.status(400).send({ message: "Unthorized" });
      }

      const comment = await Comment.create({
        comment_id: v4(),
        text,
        user_id: user,
        post_id,
      });

      if (!comment) {
        res.status(400).send({ message: "Comment creation failed." });
      }

      return comment;
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};
