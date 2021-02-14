const express = require('express');
const router = express.Router();
// Load User model
const User = require('../models/User');
const addSubscriber = require('./helper')

/**
Data needs to be structured like this

{ email : whatever@company.com, phone: '123-456-7891}

**/



router.post('/subscribe', function(req, res){
  res.json(addSubscriber(req.body.email,req.body.phone,req.body.zip,req.body.city));
})
  





module.exports = router;
