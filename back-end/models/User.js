const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({

  email: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  }
});


const User = mongoose.model('users', UserSchema);

module.exports = User;
