const jwt = require("jsonwebtoken");
const { User } = require("../models");
const dotenv = require("dotenv");
dotenv.config();

const { JWT_SECRET } = process.env;

exports.checkAuth = async (token) => {
  if (!token) {
    throw new Error("Not authorized");
  }
  const valid = token.split(" ")[1];
  try {
    const decoded = jwt.verify(valid, JWT_SECRET);

    const user = await User.findOne({
      where: { user_id: decoded.user_id },
    });
    if (!user) {
      throw new Error("Not authorized");
    }

    return user.user_id;
  } catch (error) {
    console.log(error);
    throw new Error("Not authorized");
  }
};

exports.restricTO = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      throw new Error("You do not have permission to perform this action");
    }
    next();
  };
};
