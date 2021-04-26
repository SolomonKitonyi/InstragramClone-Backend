const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = mongoose.model("User");

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return res.status(422).json({ error: "please add all fields" });
  }
  User.findOne({ email: email })
    .then((saveduser) => {
      if (saveduser)
        return res.status(422).json({ error: "User already exists" });

      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          name,
          email,
          password: hashedPassword,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: "Saved Successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(error);
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(422).json({ error: "Please enter email or password" });
  User.findOne({ email: email }).then((saveduser) => {
    if (!saveduser)
      return res.status(422).json({ error: "Invalid email or password" });

    bcrypt
      .compare(password, saveduser.password)
      .then((domatch) => {
        if (domatch) return res.json({ message: "Successfully signed in" });
        return res.json({ error: "Invalid email or password" });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
