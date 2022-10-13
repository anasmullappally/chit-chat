const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB()
const app = express();

app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on ${PORT}`));

let controllers=10
