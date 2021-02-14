const express = require('express');
const router = express.Router();
// Load User model
const User = require('../models/User');
const addSubscriber = require('./helper');

/**
 * 
 * Endpoint is https://deductive-tempo-196321.uc.r.appspot.com
 * data sent needs to be structured {'name': 'Carlos Avalos', 'email': 'avaloscarlos900dsds@gmail.com', 'zip':'96036','city' : 'Chicago'}
 */
router.post('/subscribe', function(req, res){
  console.log(req.body);
  addSubscriber(req.body.name,req.body.email,req.body.phone,req.body.zip,req.body.city,res);
})
  





module.exports = router;
