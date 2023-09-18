const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class encrpt {
  static hashPassword(password) {
    return bcrypt.hash(password, 10);
  }
  static comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  }
  static generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
  }
}
module.exports = encrpt;
