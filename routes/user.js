const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { getUserByEmail } = require("../controllers/userController");
// Apply if you have authentication

router.get("/:email", getUserByEmail);
// Assuming your user model is User

router.get("/friends", async (req, res) => {
  getUserByEmail;

  try {
    // Log to ensure the route is being hit
    console.log("GET /friends called");

    const users = await User.find({ _id: { $ne: req.user.id } }).select([
      "email",
    ]); // Fetch only the email field
    console.log("Users found:", users); // Log the found users
    const emails = users.map((user) => user.email);
    res.json(emails); // Send the array of emails as a JSON response
  } catch (error) {
    console.error("Error fetching emails:", error); // Log errors if any
    res.status(500).json({ message: "Server error" });
  }
});
// Route to update user's location
router.post("/location", async (req, res) => {
  const { email, location } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { location }, // Assuming your User model has a location field
      { new: true, upsert: true }, // `upsert: true` creates a new user if it doesn't exist
    );

    res.json({ success: true, user });
    console.log({ email }, { location });
  } catch (error) {
    console.error("Error saving location:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
