
const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const User = require("../models/User");

router.get("/friends", async (req, res, next) => {
  let emailParam = req.query.email;
  
  console.log(emailParam);

  try {
    // Log to ensure the route is being hit
    console.log("GET /friends called");

    // Step 1: Find the user by email to get their ID
    const currentUser = await User.findOne({ email: emailParam }).select("_id");
    if (!currentUser) {
      console.log("User with this email not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Log the found user ID
    console.log("Current user ID:", currentUser._id);

    // Step 2: Fetch users excluding the current user
    const users = await User.find({ _id: { $ne: currentUser._id } }).select("email");

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

