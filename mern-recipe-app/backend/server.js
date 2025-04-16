const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipes");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(session({
  secret: "secretKey",
  resave: false,
  saveUninitialized: false,
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/auth", authRoutes);
app.use("/recipes", recipeRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
