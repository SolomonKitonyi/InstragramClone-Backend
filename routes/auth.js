const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello");
});

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return res.status(422).json({ error: "please add all fields" });
  }
  res.status(200).json({ message: "Successfully posted" });
});

module.exports = router;
