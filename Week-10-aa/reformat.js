const fs = require('fs')
var content = JSON.parse(fs.readFileSync('AAdataALL.json'));
var async = require('async');

var newJSON = [];
var addressesForDb = content;

console.log(content.length, 'original length')


async.eachSeries(

   
    addressesForDb,
    function(value, callback) { 
        
   
    
        value.thisMeeting.meetingDetails.forEach(
            function(d,index){
            
               var oldJSON = {};
               
                  oldJSON.latLong = {...value.latLong};
                  oldJSON.thisMeeting = {...value.thisMeeting};
                   
                  oldJSON.thisMeeting.meetingDetails = d;
                   
                  newJSON.push(oldJSON);
            }
            
            )
             
         
         callback();
         
         }, function(err){
             console.log(newJSON.length, 'new length')  
             
              let data = JSON.stringify(newJSON,null,2);
              fs.writeFileSync('newAAdata.json', data);
         }
        
    );
    
    