//create items to insert into table per the process blog

var blogEntries = [];

class BlogEntry {
  constructor(breadType, breadName, date, flour, salt, water, yeast, unitOfMeasurement, folds, foldCount, totalTimeHours, totalTimeMinutes, result) {
    this.breadType = {};
    this.breadType.S = breadType;
    this.breadName = {};
    this.breadName.S = breadName;
    this.date = {}; 
    this.date.S = new Date(date).toDateString();
    this.flour = {};
    this.flour.N = flour.toString();
    this.salt = {};
    this.salt.N = salt.toString();
    this.water = {};
    this.water.N = water.toString();
    this.yeast = {};
    this.yeast.N = yeast.toString();
    this.unitOfMeasurement = {};
    this.unitOfMeasurement.S = unitOfMeasurement;
    this.folds = {};
    this.folds.BOOL = folds; 
    if (foldCount != null) {
      this.foldCount = {};
      this.foldCount.N = foldCount.toString(); 
    this.totalTimeHours = {};
    this.totalTimeHours.N = totalTimeHours.toString();
    this.totalTimeMinutes = {};
    this.totalTimeMinutes.N = totalTimeMinutes.toString();
    this.result = {};
    this.result.S = result;
    }
    this.month = {};
    this.month.N = new Date(date).getMonth().toString();
  }
}

blogEntries.push(new BlogEntry('Wheat','50% Whole Wheat Bread with Biga', 'June 25 2020', 500, 11, 400, 1.7, 'grams', true, 3, 19, 45, 'Crisp. good rise due to banneton basket. Hearty and dense.'));
blogEntries.push(new BlogEntry('Wheat','Harvest Bread with Poolish', 'May 29 2020', 500, 10.5, 390, 1.7, 'grams', true, 2, 16, 15, 'Decent, large bubbles. Good height and crisp crust. Like a healthy wheat bread with the lightness of white bread.'));
blogEntries.push(new BlogEntry('White','Overnight White Bread with Poolish', 'May 13 2020', 500, 10.5, 375, 1.7, 'grams', true, 3, 15, 59, 'Softer than normal, fendue shape of loaf was lost in baking, otherwise normal rise.'));
blogEntries.push(new BlogEntry('White','White Bread with 80% Biga', 'January 31, 2021', 500, 11, 375, 1.32, 'grams', true, 2, 20, 30, 'Not as much crackling as ususal, didn\'t take much of the banneton shape. Overall ok structure.'));
blogEntries.push(new BlogEntry('White','Saturday White Bread', 'April 23, 2020', 500, 10.5, 360, 2, 'grams', true, 2, 7, 30, 'Used 7 quart dutch oven to bake, loaf had a lot of holes and rose well but was rather flat overall. Folds were made too late in the process but didn\'t seem to make a difference.'));
blogEntries.push(new BlogEntry('Wheat','Saturday 75% Whole Wheat Bread', 'April 25, 2020', 500, 11, 400, 1.5, 'grams', true, 3, 8, 0, 'A little dense on top with nice holes on the bottom. Good breakfast bread.'));
blogEntries.push(new BlogEntry('Wheat','Overnight 40% Whole Wheat Bread', 'May 1, 2020', 500, 11, 400, 1.5, 'grams', true, 3, 19, 45, 'Nice, tall loaf. Good sandwhich bread. Made with new 4 quart dutch oven.'));
blogEntries.push(new BlogEntry('White','Overnight White Bread', 'April 28, 2020', 500, 11, 390, .4, 'grams', true, 3, 14, 15, 'The dough was very loose to handle. Due to the large dutch oven it was rather flat again, but overall tasted great.'));


console.log(blogEntries);


////// starter code - populate your 'table'


var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";
async = require('async')

var dynamodb = new AWS.DynamoDB();

async.eachSeries(blogEntries, function(value, callback) {

var params = {};
params.Item = value; 
params.TableName = "processBlog";

dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
    setTimeout(callback, 1000); 
});