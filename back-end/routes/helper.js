const { response } = require('express');
const User = require('../models/User');

function saveUser(user,name, email, phone, zip, city,res){
  if(!user){
    const newUser = new User({ 
      name,
      email,
      phone,
      zip,
      city
    });
    newUser.save().then(user => {
      res.json({'success' : 'true'});
    }).catch(err => console.log(err));
  }
  else{
    res.json({'error' : 'email or phone already registered.'});
  }

}

function addSubscriber(name,email,phone,zip,city,res){
 
  if(email && !(phone)){

    User.findOne({
      email: email,
    }).then(user =>{

      saveUser(user,name, email, phone, zip, city,res);

    })

  } 
  else if(phone && !(email)){
    User.findOne({
      phone: req.body.phone
    }).then(user =>{
      saveUser(user, name, email, phone, zip, city,res);
    })
    
  }
  else if(phone && email){
    User.findOne({
      email: email,
      phone: phone
    }).then(user =>{
      saveUser(user,name, email, phone, zip, city,res);
    })

  }
}

module.exports = addSubscriber ;