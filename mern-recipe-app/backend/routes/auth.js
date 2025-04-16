const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { name, password } = req.body;
  const existing = await User.findOne({ name });
  if (existing) return res.status(400).json({ message: "User exists" });

  const newUser = new User({ name, password });
  await newUser.save();
  req.session.user = newUser;
  res.json(newUser);
});

router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name, password });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  req.session.user = user;
  res.json(user);
});

router.get("/me", (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

module.exports = router;
