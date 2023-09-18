const { User, Post } = require("../models");
exports.Comment = {
  user_id: (parent, args, context) => {
    return User.findOne({ where: { user_id: parent.user_id } });
  },
  post_id: (parent, args, context) => {
    return Post.findOne({ where: { post_id: parent.post_id } });
  },
};
