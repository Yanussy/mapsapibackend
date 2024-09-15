
const express = require('express');
const router = express.Router();
const { getUserByEmail } = require('../controllers/userController');
// Apply if you have authentication

router.get('/:email', getUserByEmail);

module.exports = router;
