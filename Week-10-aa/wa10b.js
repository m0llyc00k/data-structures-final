const { Client } = require('pg');
const fs = require('fs'),
    dotenv = require('dotenv');


var async = require('async');
dotenv.config();

var content = JSON.parse(fs.readFileSync('AAdata3.json'));


// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'Molly';
db_credentials.host = 'ds-21.cpjfwihkx2vx.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

var addressesForDb = content;
async.eachSeries(
    

    addressesForDb, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
    // var thisQuery = "INSERT INTO meeting_loc(name,location,lat,lng,postcode,floor,wheelchair,groupid) VALUES ($$"+ value.name +"$$ , $$" + value.location + "$$ , $$"+ value.lat + "$$ , $$" + value.lng + "$$ , $$"+ value.postcode + "$$ , $$" + value.floor + "$$, $$" + value.wheelChair +"$$, $$" + value.group +"$$ );";


    var thisQuery = "INSERT INTO AA_meeting_data(address,lat,long,zipCode,zone,venue,roomDetail,directionDetail,groupName,wheelchairAccess,miscDetails,day,trueStartTime,trueEndTime,meetingType,specialInerest) VALUES ($$" + value.thisMeeting.address + "$$, $$" + value.latLong.lat + "$$, $$" + value.latLong.long + "$$, $$" + value.thisMeeting.zipCode + "$$, $$" + value.thisMeeting.zone + "$$, $$" + value.thisMeeting.venue + "$$, $$" + value.thisMeeting.roomDetail + "$$, $$" + value.thisMeeting.directionDetail + "$$, $$" + value.thisMeeting.groupName + "$$, $$" + value.thisMeeting.wheelchairAccess + "$$, $$" + value.thisMeeting.miscDetails + "$$, $$" + value.thisMeeting.meetingDetails.day + "$$, $$" + value.thisMeeting.meetingDetails.trueStartTime + "$$, $$" + value.thisMeeting.meetingDetails.trueEndTime + "$$, $$" + value.thisMeeting.meetingDetails.meetingType + "$$, $$" + value.thisMeeting.meetingDetails.specialInerest + "$$);";
    // var thisQuery = "INSERT INTO aa_meeting_database(address,lat,long,zipCode,zone,venue,roomDetail,directionDetail,groupName,wheelchairAccess,miscDetails) VALUES ($$" + value.thisMeeting.address + "$$, $$" + value.latLong.lat + "$$, $$" + value.latLong.long + "$$, $$" + value.thisMeeting.zipCode + "$$, $$" + value.thisMeeting.zone + "$$, $$" + value.thisMeeting.venue + "$$, $$" + value.thisMeeting.roomDetail + "$$, $$" + value.thisMeeting.directionDetail + "$$, $$" + value.thisMeeting.groupName + "$$, $$" + value.thisMeeting.wheelchairAccess + "$$, $$" + value.thisMeeting.miscDetails + "$$);";
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    setTimeout(callback, 1000); 
}); 

//try to troubleshoot by inserting one column at a time

// var thisQuery = "INSERT INTO meeting_loc(name,location,lat,lng,postcode,floor,wheelchair,groupid) VALUES ($$"+ value.name +"$$ , $$" + value.location + "$$ , $$"+ value.lat + "$$ , $$" + value.lng + "$$ , $$"+ value.postcode + "$$ , $$" + value.floor + "$$, $$" + value.wheelChair +"$$, $$" + value.group +"$$ );";

//https://www.youtube.com/watch?v=0GpQJM7w6M8&t=257s

//pgadmin
