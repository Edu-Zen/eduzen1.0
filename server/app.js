const express = require('express');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');

require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Use routes
app.use('/api', studentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
