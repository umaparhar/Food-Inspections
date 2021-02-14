require('dotenv').config()
const axios = require('axios');
const sgMail = require('@sendgrid/mail');
const soda = require('soda-js');
const getUserData = require('./get-user-data');

// TODO: add logic to city based query
// TODO: get alerts by specific restaurants for their zip code
// TODO: add more info to emails: risk level, etc
// TODO: add SMS phone alert

function sendEmail(locationNames, subscriberInfo){
  const apiKey = process.env.SENDGRID_API_KEY;

  sgMail.setApiKey(apiKey);

  const msg = {
    to: subscriberInfo.email,
    from: 'jigar@novuspartners.org',
    subject: 'Food Safety Risk Alert',
    text: `There are food risks in your area. These are some place(s) to name a few: ${locationNames}. Visit our website for more info`,
  };

  sgMail.send(msg)
  .then( (res) => console.info(res))
  .catch( (error) => console.error(error.response.body.errors ))
}

function sendAlerts(data, subscriberInfo){

  let locationNames = null;
  let firstLocation = true;

  data.forEach(inspection => {
    console.log(inspection)

    if(firstLocation){
      locationNames = `${inspection.dba_name}`
      firstLocation = false;
    }else{
      locationNames += `, ${inspection.dba_name}`
    }
  });  

  if(locationNames != null && subscriberInfo.email.includes("@") )
    sendEmail(locationNames, subscriberInfo);

}

function callAPI(currentTimeStamp, subscriberInfo){

  console.log(`checking food inspection data at currentTimeStamp: ${currentTimeStamp}`)

  let consumer = new soda.Consumer('data.cityofchicago.org');    
  const numEntries = 5
  
  consumer.query()
    .withDataset('4ijn-s7e5')
    .limit(numEntries)
    .where({zip: subscriberInfo.zip, inspection_date: currentTimeStamp})
    .getRows()
    .on('success', function(rows) { sendAlerts(rows, subscriberInfo); })
    .on('error', function(error) { console.error(error); });  
}

// todo: use zip code from mongo & not hard code 
function checkFoodDataAndSendAlerts(subscriberInfo){
    
    const currentYear = `${new Date().getFullYear()}`
    const currentMonth = `${new Date().getMonth()}`
    const currentDate = `${new Date().getDate()}`
    const currentTimeStamp = `${currentYear}-${currentMonth}-${currentDate}T00:00:00.000`
    
    subscriberInfo.forEach( (userData) => {
      console.log(userData)
      callAPI(currentTimeStamp, userData)
    })    

    // Note: data below is for testing purposes

    // const currentTimeStamp = `2021-02-08T00:00:00.000`
    // const userData = {
    //   email: 'test@company.com',
    //   phone: '123-456-2433',
    //   zip: '60618',
    //   city: 'CHICAGO'
    // }
    // callAPI(currentTimeStamp, userData)
}

function checkDBAndSendAlerts(){
  getUserData.getUserEmails(checkFoodDataAndSendAlerts)
}

// Note: call for testing purposes
// checkDBAndSendAlerts();

// const currentTimeStamp = `2021-02-08T00:00:00.000`
// callAPI(currentTimeStamp, null)

exports.checkDBAndSendAlerts = checkDBAndSendAlerts;

