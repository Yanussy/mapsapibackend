
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const helmet = require('helmet');
// Load environment variables
require('dotenv').config();

// Connect to database
connectDB();

app.use(helmet());


app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://mapsapibackend.onrender.com"],
      styleSrc: ["'self'", "https://mapsapibackend.onrender.com"],
      imgSrc: ["'self'", "data:", "https://mapsapibackend.onrender.com"],
      connectSrc: ["'self'", "https://mapsapibackend.onrender.com"],
      fontSrc: ["'self'", "https://mapsapibackend.onrender.com"],
    },
  })
);
// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*' // Replace with your frontend's URL for security in production
}));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
