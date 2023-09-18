const { User, Comment } = require("../models");

exports.Post = {
  user_id: (parent, args, context) => {
    return User.findOne({ where: { user_id: parent.user_id } });
  },
  comment: (parent, args, context) => {
    return Comment.findAll({ where: { post_id: parent.post_id } });
  },
};
