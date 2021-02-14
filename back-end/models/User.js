const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name:{
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  zip:{
    type: Number,
    required: false
  },
  city:{
    type: String,
    required: false
  }

});


const User = mongoose.model('users', UserSchema);

module.exports = User;
