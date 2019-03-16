const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
// const PasswordComplexity = require("joi-password-complexity");
const mongoose = require("mongoose");

// const complexityOptions = {
//   min: 10,
//   max: 30,
//   lowerCase: 1,
//   upperCase: 1,
//   numeric: 1,
//   symbol: 1,
//   requirementCount: 2
// };

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true
  },
  username: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true
  },
  password: {
    type: String,
    minlength: 3,
    maxlength: 1024,
    required: true
  },
  isAdmin: { type: Boolean, default: true }
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    username: Joi.string()
      .min(3)
      .max(50)
      .required(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required()
  };

  // const cmx = Joi.validate(
  //   user.password,
  //   new PasswordComplexity(complexityOptions)
  // );
  // if (cmx.error) return cmx;

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
