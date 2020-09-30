const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

const { validatePassword, validateEmail } = require("../../validators/validators");

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ msg: "Please enter all fields" });
  }

  if (!validateEmail(email)) {
    return res.status(400).send({ msg: "Invalid email address format specified" });
  }

  if (!validatePassword(password)) {
    return res.status(400).send({ msg: "Password must be at least 8 characters in length and must contain at least 1 lowercase letter, 1 uppercase letter, 1 numeric digit, and 1 special character" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).send({ msg: "Already registered user with this email" });
  } else {
    const newUser = new User({
      name,
      email,
      password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user,
              });
            }
          );
        });
      });
    });
  }
});

module.exports = router;
