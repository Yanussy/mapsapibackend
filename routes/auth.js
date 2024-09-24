
const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const User = require("../models/User");

router.get("/friends", async (req, res) => {
  try {
    // Log to ensure the route is being hit
    console.log("GET /friends called");

    const users = await User.find({}, "email"); // Fetch only the email field
    if (!users || users.length === 0) {
      console.log("No users found"); // Log if no users are found
      return res.status(404).json({ message: "No users found" });
    }

    console.log("Users found:", users); // Log the found users
    const emails = users.map((user) => user.email);
    res.json(emails); // Send the array of emails as a JSON response
  } catch (error) {
    console.error("Error fetching emails:", error); // Log errors if any
    res.status(500).json({ message: "Server error" });
  }
});


router.post('/login', login);

module.exports = router;
