const mongoose = require('mongoose');
const databaseCredentials = require('./mongoDBkeys').mongoURI
const User = require('../models/User')


// Connect to MongoDB
mongoose
  .connect( databaseCredentials, { useNewUrlParser: true , useUnifiedTopology: true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


function getUserEmails(checkDataAndSendAlerts){

  const filter = {};

  User.find(filter).then( (data) => {

    // for each user search by zip code & send email
    // pass in send alert function & call it here
    
    checkDataAndSendAlerts(data);
    

  })

}

exports.getUserEmails = getUserEmails;


// data.forEach( (userInfo) => {
//   const subscriberInfo = {
//     email: null,
//     phone: null
//   }

//   const email = userInfo.email;
//   if(email.includes("@")){
//     subscriberInfo.email = email
//   }

  

//   userEmails.push(email);
    
// })