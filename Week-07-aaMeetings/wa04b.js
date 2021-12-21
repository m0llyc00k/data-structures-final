const { Client } = require('pg');
var async = require('async');  
const dotenv = require('dotenv');
dotenv.config();  

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'Molly';
db_credentials.host = 'ds-21.cpjfwihkx2vx.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

var addressesForDb = [{"address":"20 CARDINAL HAYES PL New York NY ","latLong":{"lat":"40.7133","lng":"-74.0024"}},{"address":"20 CARDINAL HAYES PL New York NY ","latLong":{"lat":"40.7132597018695","lng":"-74.0023994478748"}},{"address":"29 MOTT ST New York NY ","latLong":{"lat":"40.7148047974301","lng":"-73.9990377012436"}},{"address":"49 FULTON ST New York NY ","latLong":{"lat":"40.708","lng":"-74.0042"}},{"address":"44 JOHN ST New York NY ","latLong":{"lat":"40.7092","lng":"-74.0081"}},{"address":"49 FULTON ST New York NY ","latLong":{"lat":"40.708","lng":"-74.0042"}},{"address":"20 CARDINAL HAYES PL New York NY ","latLong":{"lat":"40.7132597018695","lng":"-74.0023994478748"}},{"address":"22 BARCLAY ST New York NY ","latLong":{"lat":"40.7125098758043","lng":"-74.0094653605709"}},{"address":"20 CARDINAL HAYES PL New York NY ","latLong":{"lat":"40.7132597018695","lng":"-74.0023994478748"}},{"address":"22 BARCLAY ST New York NY ","latLong":{"lat":"40.7125098758043","lng":"-74.0094653605709"}},{"address":"283 W BROADWAY New York NY ","latLong":{"lat":"40.7208247814361","lng":"-74.0048537254953"}},{"address":"125 BARCLAY ST New York NY ","latLong":{"lat":"40.7143559829254","lng":"-74.0130165248683"}},{"address":"49 FULTON ST New York NY ","latLong":{"lat":"40.708","lng":"-74.0042"}},{"address":"49 FULTON ST New York NY ","latLong":{"lat":"40.7080475730195","lng":"-74.0042375398091"}},{"address":"20 CARDINAL HAYES PL New York NY ","latLong":{"lat":"40.7133","lng":"-74.0024"}},{"address":"283 W BROADWAY New York NY ","latLong":{"lat":"40.7208247814361","lng":"-74.0048537254953"}},{"address":"49 FULTON ST New York NY ","latLong":{"lat":"40.7080475730195","lng":"-74.0042375398091"}},{"address":"22 BARCLAY ST New York NY ","latLong":{"lat":"40.7125","lng":"-74.0095"}},{"address":"20 CARDINAL HAYES PL New York NY ","latLong":{"lat":"40.7132597018695","lng":"-74.0023994478748"}},{"address":"283 W BROADWAY New York NY ","latLong":{"lat":"40.7208247814361","lng":"-74.0048537254953"}},{"address":"283 W BROADWAY New York NY ","latLong":{"lat":"40.7208247814361","lng":"-74.0048537254953"}},{"address":"283 W BROADWAY New York NY ","latLong":{"lat":"40.7208247814361","lng":"-74.0048537254953"}}];
async.eachSeries(addressesForDb, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
    var thisQuery = "INSERT INTO aalocations VALUES (E'" + value.address + "', " + value.latLong.lat + ", " + value.latLong.lng + ");";
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    setTimeout(callback, 1000); 
}); 