const User = require('../models/User');

function saveUser(user, email, phone, zip, city){
  if(!user){
    const newUser = new User({ 
      email,
      phone,
      zip,
      city
    });
    newUser.save().then(user => {
      return {'success' : 'true'}
    }).catch(err => console.log(err));
  }
  else{
    return {'error': 'email or phone already registered.'};
  }
}

function addSubscriber(email,phone,zip,city){
 
  if(email && !(phone)){

    User.findOne({
      email: email,
    }).then(user =>{

      saveUser(user, email, phone, zip, city)

    })

  } 
  else if(phone && !(email)){
    User.findOne({
      phone: req.body.phone
    }).then(user =>{
      saveUser(user, email, phone, zip, city)
    })
    
  }
  else if(phone && email){
    let response;
    User.findOne({
      email: email,
      phone: phone
    }).then(user =>{
      saveUser(user, email, phone, zip, city)
    })

  }
}

module.exports = addSubscriber ;