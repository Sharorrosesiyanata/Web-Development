const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: String,
  userId: String,
});

module.exports = mongoose.model("Recipe", recipeSchema);
