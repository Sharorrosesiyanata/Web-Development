const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

router.get("/", async (req, res) => {
  const recipes = await Recipe.find({ userId: req.session.user._id });
  res.json(recipes);
});

router.post("/", async (req, res) => {
  const { name, ingredients } = req.body;
  const recipe = new Recipe({ name, ingredients, userId: req.session.user._id });
  await recipe.save();
  res.json(recipe);
});

router.put("/:id", async (req, res) => {
  const { name, ingredients } = req.body;
  const updated = await Recipe.findByIdAndUpdate(req.params.id, { name, ingredients }, { new: true });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
