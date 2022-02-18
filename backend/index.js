require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todos");

const app = express();
app.use(cors());

app.use(bodyParser.json());

// Start Mongoose
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));
// End Mongoose

// Start Create routes to accept json
app.use(express.json());
app.use("/todos", todoRoutes);
// End create routes

// Starting the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
