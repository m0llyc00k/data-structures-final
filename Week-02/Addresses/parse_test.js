const fs = require('fs');
var cheerio = require('cheerio');

// const myArray = ['apple', 'banana', 'orange'];
var content = fs.readFileSync('address_strings.json');
var $ = cheerio.load(content);

var str = `${content}`;


fs.writeFileSync('address_parse.json', JSON.parse(str.split(',')) + '\n')



