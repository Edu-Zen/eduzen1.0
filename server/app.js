require('dotenv').config();
const express = require("express");
const app = express();
const db = require("./config/db");
const auth = require("./routes/auth");
const students = require("./routes/students");
const cors = require('cors');
const bodyParser = require('body-parser');

// Connect to the database
db();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
// Routes
app.use("/api/auth", auth);
app.use("/api/students", students);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
