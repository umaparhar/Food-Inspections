const User = require('../models/User');

function addSubscriber(email,phone,zip,city){
 
  if(email && !(phone)){
    User.findOne({
      email: email,
    }).then(user =>{
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
    })
  } 

  
  else if(phone && !(email)){
    User.findOne({
      phone: req.body.phone
    }).then(user =>{
      if(!user){
        const newUser = new User({ 
          email,
          phone,
          zip,
          city
        });

        newUser.save().then(user => {
          return {'success' : 'true'}
        };
        }).catch(err => console.log(err));
      }
      else{
        return {'error': 'email or phone already registered.'};
      }
    })
    
  }

  else if(phone && email){
    let response;
    User.findOne({
      email: email,
      phone: phone
    }).then(user =>{
      if(!user){
        const newUser = new User({ 
          email,
          phone,
          zip,
          city
        });

        newUser.save().async(user => {
         return {'success' : 'true'};
        }).catch(err => console.log(err));
      }
      else{
        return {'error': 'email or phone already registered.'};
      }
    })

  }
}

module.exports = addSubscriber ;