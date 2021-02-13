require('dotenv').config()
const axios = require('axios');
const sgMail = require('@sendgrid/mail');
const soda = require('soda-js');

// TODO: convert city name to city name & state code
//! FIXME: CITY WORKS BY PASSING IN JSON OBJECT
//! fixme: might have to manually parse if can't search by two where conditions
// TODO: get alerts by specific restaurants for their zip code
// TODO: add more info to emails: risk level, etc

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

  if(locationNames != null)
    sendEmail(locationNames, subscriberInfo);

}

function callAPI(currentTimeStamp, zipcode, subscriberInfo){

  console.log(`checking food inspection data at currentTimeStamp: ${currentTimeStamp}`)

  let consumer = new soda.Consumer('data.cityofchicago.org');    
  const numEntries = 5
  
  consumer.query()
    .withDataset('4ijn-s7e5')
    .limit(numEntries)
    .where({zip: zipcode, inspection_date: currentTimeStamp})
    .getRows()
    .on('success', function(rows) { sendAlerts(rows, subscriberInfo); })
    .on('error', function(error) { console.error(error); });  
}
function checkDataAndSendAlerts(){
    
    // const currentYear = `${new Date().getFullYear()}`
    // const currentMonth = `${new Date().getMonth()}`
    // const currentDate = `${new Date().getDate()}`
    // const currentTimeStamp = `${currentYear}-${currentMonth}-${currentDate}T00:00:00.000`

    const currentTimeStamp = `2021-02-08T00:00:00.000`
    const zipcode = 60618;

    const subscriberInfo = {
      email: 'jigar.moyo@gmail.com',
      phone: '123-456-7890'
    }


    callAPI(currentTimeStamp, zipcode, subscriberInfo)
}

// checkDataAndSendAlerts();

exports.checkDataAndSendAlerts = checkDataAndSendAlerts;




