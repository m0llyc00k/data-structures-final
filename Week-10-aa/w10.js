const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();  

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'Molly';
db_credentials.host = 'ds-21.cpjfwihkx2vx.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();



// Sample SQL statement to create a table: 
var thisQuery = "CREATE TABLE AA_meeting_data (address varchar(100), lat double precision, long double precision, zipCode varchar(100), zone varchar(50), venue varchar(200), roomDetail varchar(200), directionDetail varchar(300), groupName varchar(200), wheelchairAccess varchar(100), miscDetails varchar(300), day varchar(100), trueStartTime varchar(100), trueEndTime varchar(100), meetingType varchar(100), specialInerest varchar(200))";
// Sample SQL statement to delete a table: 
// var thisQuery = "DROP TABLE AA_meeting_data;"; 

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});