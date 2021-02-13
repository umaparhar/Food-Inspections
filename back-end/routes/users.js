const express = require('express');
const router = express.Router();
// Load User model
const User = require('../models/User');



/**
Data needs to be structured like this

{ email : whatever@company.com, phone: '123-456-7891}


**/
  
router.post('/subscribe', function(req, res) {
  var email = req.body.email;
  var phone = req.body.phone;

  if(email && !(phone)){
    User.findOne({
      email: email.toLowerCase(),
    }).then(user =>{
      if(!user){
        const newUser = new User({ 
          email,
          phone
        });

        newUser.email = req.body.email;
        newUser.phone  = req.body.phone;

        newUser.save().then(user => {
          res.json({'success' : 'true'})
        }).catch(err => console.log(err));
      }
      else{
        res.json({'error': 'email or phone already registered.'})
      }
    })
  }
  if(phone && !(email)){
    User.findOne({
      phone: req.body.phone
    }).then(user =>{
      if(!user){
        const newUser = new User({ 
          email,
          phone
        });

        newUser.email = req.body.email;
        newUser.phone  = req.body.phone;

        newUser.save().then(user => {
          res.json({'success' : 'true'})
        }).catch(err => console.log(err));
      }
      else{
        res.json({'error': 'email or phone already registered.'})
      }
    })
    
  }

  if(phone && email){
    User.findOne({
      email: req.body.email,
      phone: req.body.phone
    }).then(user =>{
      if(!user){
        const newUser = new User({ 
          email,
          phone
        });

        newUser.email = req.body.email;
        newUser.phone  = req.body.phone;

        newUser.save().then(user => {
          res.json({'success' : 'true'})
        }).catch(err => console.log(err));
      }
      else{
        res.json({'error': 'email or phone already registered.'})
      }
    })
    
  }
  
});





module.exports = router;
