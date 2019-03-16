const express = require("express");
const _ = require("lodash");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Invalid username or password.");

  const validPass = bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid username or password.");

  const token = user.generateAuthToken();
  res.send(token);
});

function validate(user) {
  const schema = {
    username: Joi.string()
      .min(3)
      .max(50)
      .required(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required()
  };
  return Joi.validate(user, schema);
}

module.exports = router;
