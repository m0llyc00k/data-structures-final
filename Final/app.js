var express = require('express'),
    app = express();
const { Pool } = require('pg');
var AWS = require('aws-sdk');
const moment = require('moment-timezone');
const handlebars = require('handlebars');
var fs = require('fs');
// const indexSource = fs.readFileSync("templates/sensor.txt").toString();
// var template = handlebars.compile(indexSource, { strict: true });

const pbSource = fs.readFileSync("pb.txt").toString();
var pbtemplate = handlebars.compile(pbSource, { strict: true });

// AWS RDS credentials
var db_credentials = new Object();
db_credentials.user = 'Molly';
db_credentials.host = 'ds-21.cpjfwihkx2vx.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// create templates
var hx = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AA Meetings</title>
  <meta name="description" content="Meetings of AA in Manhattan">
  <meta name="author" content="AA">
  <style>
   #mapid { height: 760px; }

table {
  border-collapse: collapse;
  font-family: sans-serif;
}

table, th, td {
  border: 1px solid black;
}

h3, p {
    font-family: sans-serif;
}

p {
    color: red;
}

td {
  border-top:0pt none;
  margin-top:0pt;
  padding-bottom:5px;
  padding-left:12px;
  padding-right:12px;
  padding-top:5px;
}

.blinking{
    animation:blinkingText 1.5s linear infinite;
}
@keyframes blinkingText{
  50% {
    opacity: 0;
  }
}
  
  </style>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
       integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
       crossorigin=""/>
</head>
<body>
<div id="mapid"></div>
<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
   integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
   crossorigin=""></script>
  <script>
  var data = 
  `;

var jx = `;
    var mymap = L.map('mapid').setView([40.734636,-73.994997], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1Ijoidm9ucmFtc3kiLCJhIjoiY2pveGF1MmxoMjZnazNwbW8ya2dsZTRtNyJ9.mJ1kRVrVnwTFNdoKlQu_Cw'
    }).addTo(mymap);
    
    
    for (var i=0; i<data.length; i++) {
        L.marker( [data[i].lat, data[i].long] ).bindPopup(JSON.stringify(data[i].meetings)).addTo(mymap);
    }
    
    
    
    </script>
    </body>
    </html>`;


app.get('/', function(req, res) {
    res.send('<h3>Code demo site</h3><ul><li><a href="/aa">aa meetings</a></li><li><a href="/processblog">process blog</a></li></ul>');
});


// .bindPopup(JSON.stringify(data[i].meetings)).addTo(mymap);

// respond to requests for /aa
app.get('/aa', function(req, res) {

    var now = moment.tz(Date.now(), "America/New_York");
    // var dayy = now.day().toString(); 
    // var hourr = now.hour().toString(); 
    var raw_dayy = now.day().toString();
    var raw_hourr = now.hour().toString();

    var dayy, hourr;

    switch (now.day().toString()) {
        case '1':
            // code
            dayy = `'Mondays'`
            break;
        case '2':
            //code
            dayy = `'Tuesdays'`
            break;
        case '3':
            // code
            dayy = `'Wednesdays'`
            break;
        case '4':
            // code
            dayy = `'Thursdays'`
            break;
        case '5':
            // code
            dayy = `'Fridays'`
            break;
        case '6':
            // code
            dayy = `'Saturdays'`
            break;
        case '7':
            // code
            dayy = `'Sundays'`
            break;
        default:
            dayy = 'Mondays'
    }

    // console.log('raw_dayy is', raw_dayy)
    // console.log('dayy is', dayy)

    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);


    //var thisQuery = "INSERT INTO AA_meeting_data(address,lat,long,zipCode,zone,venue,roomDetail,directionDetail,groupName,wheelchairAccess,miscDetails,day,trueStartTime,trueEndTime,meetingType,specialInerest) VALUES ($$" + value.thisMeeting.address + "$$, $$" + value.latLong.lat + "$$, $$" + value.latLong.long + "$$, $$" + value.thisMeeting.zipCode + "$$, $$" + value.thisMeeting.zone + "$$, $$" + value.thisMeeting.venue + "$$, $$" + value.thisMeeting.roomDetail + "$$, $$" + value.thisMeeting.directionDetail + "$$, $$" + value.thisMeeting.groupName + "$$, $$" + value.thisMeeting.wheelchairAccess + "$$, $$" + value.thisMeeting.miscDetails + "$$, $$" + value.thisMeeting.meetingDetails.day + "$$, $$" + value.thisMeeting.meetingDetails.trueStartTime + "$$, $$" + value.thisMeeting.meetingDetails.trueEndTime + "$$, $$" + value.thisMeeting.meetingDetails.meetingType + "$$, $$" + value.thisMeeting.meetingDetails.specialInerest + "$$);";

    // SQL query 
    var thisQuery = `
                SELECT lat, long, json_agg(json_build_object('loc', directionDetail, 'address', address, 'time', trueStartTime, 'name', groupName, 'day', day, 'types', specialInerest, 'shour', trueStartTime)) as meetings
                 FROM aa_meeting_data
                WHERE day = ` + dayy + `
                 GROUP BY lat, long
 ;`;

    // SQL query 
    //   var thisQuery = `
    //             SELECT lat, long, json_agg(json_build_object('loc', directionDetail, 'address', address, 'time', trueStartTime, 'name', groupName, 'day', day, 'types', specialInerest, 'shour', trueStartTime)) as meetings
    //              FROM aa_meeting_data
    //              WHERE day = 'Mondays'
    //              GROUP BY lat, long`





    client.query(thisQuery, (qerr, qres) => {
        if (qerr) { throw qerr }

        else {
            var resp = hx + JSON.stringify(qres.rows) + jx;
            res.send(resp);
            client.end();
            console.log('2) responded to request for aa meeting data');
        }
    });
});


app.get('/processblog', function(req, res) {
    // AWS DynamoDB credentials
    AWS.config = new AWS.Config();
    AWS.config.region = "us-east-1";

    console.log(req.query.type);
    var breadType = "White";
    if (["White", "Wheat"].includes(req.query.type)) {
        breadType = req.query.type;
    }
   

    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();

    // DynamoDB (NoSQL) query
    var params = {
        TableName: "processBlog",
        // KeyConditionExpression: "breadType = :breadType",
        KeyConditionExpression: "breadType = :breadType",
        // "breadType = :bread and #hours between :minHours and :maxHours"
        // the query expression
        // ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB. I added hours here but didn't need to.
        //     "#hours": "totalTimeHours"
        // },
        ExpressionAttributeValues: { // the query values
            ":breadType": { S: breadType },
            // ":totalTimeHours": {N: totalTimeHours}
            // ":totalTimeHours": {N: "7"}
            // ":bread": { S: "Wheat"  },
            // ":minHours": { N: (0).toString() },
            // ":maxHours": { N: (50).toString() }
        }


    };


    dynamodb.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            throw (err);
        }
        else {
            res.end(pbtemplate({ pbdata: JSON.stringify(data.Items) }));
            console.log('3) responded to request for process blog data');
        }
    });
});


// serve static files in /public
app.use(express.static('public'));

app.use(function(req, res, next) {
    res.status(404).send("Sorry can't find that!");
});

// listen on port 8080
var port = process.env.PORT || 8080;

app.listen(port, function() {
    console.log('Server listening...');
});
