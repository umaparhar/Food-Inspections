const express = require('express');
const router = express.Router();
const soda = require('soda-js');

function getData(res){

    let myPromise = new Promise(function(myResolve, myReject) {


        let consumer = new soda.Consumer('data.cityofchicago.org');    
        const numEntries = 20
        
        consumer.query()
        .withDataset('4ijn-s7e5')
        .limit(numEntries)
        // .where({zip: subscriberInfo.zip, inspection_date: currentTimeStamp})
        .getRows()
        .on('success', function(rows) { 
        
            let apiResults = []
    
            rows.forEach( (item) => {
    
                const inspectionInfo = {
                    businessName: item.dba_name,
                    address: `${item.address} ${item.city} ${item.state} ${item.zip}`,
                    risk: item.risk,
                    location: item.location,
                    violations: item.violations
                }
    
                apiResults.push(inspectionInfo)
                // console.log(inspectionInfo)
            })

            myResolve(apiResults);

            //!fixme: timeout?
        })
        .on('error', function(error) { myReject(error) });     
    });
      
    myPromise.then(
        function(value) { 
            console.log(value); 
            res.send(value)
        },
        function(error) {console.log(error);}
    );    

  }


router.get('/food-inspection-data', function(req, res){
    getData(res)
})
  





module.exports = router;
