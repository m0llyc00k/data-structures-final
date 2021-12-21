"use strict";


// in terminal, run: npm install node-fetch@2
const fetch = require('node-fetch');

// dependencies
const fs = require('fs'),
    querystring = require('querystring'),
    // got = require('got'),
    // request = require('request'),
    
    async = require('async'),
    dotenv = require('dotenv');
    // request = require("request-promise");
    // result = await request(apiRequest);
var content = JSON.parse(fs.readFileSync('AAdata1.json'));
console.log(content.length, 'original length')

// TAMU api key
dotenv.config();
const API_KEY = process.env.TAMU_KEY;
const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx';



// geocode addresses
// let meetingsData = [];

//confirm the amount of addresses passing through
// console.log(content.length)

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(content, function(value, callback) {
    let query = {
        streetAddress: value.thisMeeting.address.split('New York')[0].trim(), 
        city: "New York",
        state: "NY",
        apikey: API_KEY,
        format: "json",
        version: "4.01"
    };

    // construct a querystring from the `query` object's values and append it to the api URL
    let apiRequest = API_URL + '?' + querystring.stringify(query);
    console.log(apiRequest);
    
    fetch(apiRequest)
    .then(res => res.json())
    .then(tamuGeo => {
        
            value.latLong = {
                'lat': tamuGeo.OutputGeocodes[0].OutputGeocode.Latitude,
                'long': tamuGeo.OutputGeocodes[0].OutputGeocode.Longitude
            };
            
            console.log(value)
})

    //pass the string of addresses through JSON.parse and push
    // (async () => {
    //     try {
    //         const response = await request(apiRequest);
    //         let tamuGeo = JSON.parse(response.body);
            
    //         console.log(tamuGeo['FeatureMatchingResultType'], apiRequest);
            
    //         // meetingsData.push(tamuGeo);
            
    //         value.latLong = {
    //             'lat': tamuGeo.OutputGeocodes[0].OutputGeocode.Latitude,
    //             'long': tamuGeo.OutputGeocodes[0].OutputGeocode.Longitude
    //         };
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // })();
    
    // sleep for a couple seconds before making the next request
    setTimeout(callback, 2000);
    //create file with json data from tamuGeo inside
}, function() {
    
    fs.writeFileSync('AAdata2.json', JSON.stringify(content));
    // console.log(content)
    // console.log('*** *** *** *** ***');
    // console.log(`Number of meetings in this zone: ${meetingsData.length}`);
});
