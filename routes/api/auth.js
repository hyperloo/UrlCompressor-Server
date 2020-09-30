const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const User = require("../../models/user");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ msg: "Please enter all fields" });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send({ msg: "User Does not Exist" });

  bcrypt.compare(password, user.password).then((isMatch) => {
    if (!isMatch) return res.status(403).send({ msg: "Invalid Credentials" });

    jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        return res.json({
          token,
          user,
        });
      }
    );
  });
});

router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.status(200).json(user));
});

module.exports = router;
