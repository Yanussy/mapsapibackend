
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginOrSignUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    let isNewUser = false;

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 12);
      user = new User({ email, password: hashedPassword });
      await user.save();
      isNewUser = true;
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(isNewUser ? 201 : 200).json({
      token,
      user: { email: user.email, id: user._id },
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
