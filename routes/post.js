const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");
require("../models/user");
const Post = mongoose.model("Post");

router.post("/createpost", requireLogin, (req, res) => {
  const { title, body } = req.body;
  if (!title || !body)
    return res.status(422).json({ error: "Please enter all fields" });

  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      return res.json({ post: result });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
