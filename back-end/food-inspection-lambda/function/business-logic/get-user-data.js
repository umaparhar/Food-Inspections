const mongoose = require('mongoose');
const databaseCredentials = require('./mongoDBkeys').mongoURI
const User = require('../models/User')


// Connect to MongoDB
mongoose
  .connect( databaseCredentials, { useNewUrlParser: true , useUnifiedTopology: true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


const filter = {};
User.find(filter).then( (res) => {
console.log(res)
})