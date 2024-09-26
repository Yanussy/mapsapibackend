
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
    following: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  },});

module.exports = mongoose.model('User', UserSchema);
