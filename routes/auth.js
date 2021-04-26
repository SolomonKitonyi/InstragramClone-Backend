const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = mongoose.model("User");

router.get("/", (req, res) => {
  res.send("Hello");
});

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return res.status(422).json({ error: "please add all fields" });
  }
  User.findOne({ email: email })
    .then((saveduser) => {
      if (saveduser)
        return res.status(422).json({ error: "User already exists" });
      const user = new User({
        name,
        email,
        password,
      });
      user
        .save()
        .then((user) => {
          res.json({ message: "Saved Successfully" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(error);
    });
});

module.exports = router;
