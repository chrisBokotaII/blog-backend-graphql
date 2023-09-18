const { Post } = require("../models");

exports.User = {
  posts: (parent, args, context) => {
    let posts = Post.findAll({ where: { user_id: parent.user_id } });

    return posts;
  },
};
