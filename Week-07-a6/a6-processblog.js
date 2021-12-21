// npm install aws-sdk
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "processBlog",
    KeyConditionExpression: "breadType = :bread and #hours between :minHours and :maxHours", // the query expression
    ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB. I added hours here but didn't need to.
        "#hours" : "totalTimeHours"
    },
    ExpressionAttributeValues: { // the query values
        ":bread": {S: "Wheat"},
        ":minHours": {N: (7).toString()},
        ":maxHours": {N: (16).toString()}
    } 
};

dynamodb.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log("***** ***** ***** ***** ***** \n", item);
        });
    }
});