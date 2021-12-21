const fs = require('fs');
var cheerio = require('cheerio');

// const myArray = ['apple', 'banana', 'orange'];
var content = fs.readFileSync('addresses_m01.txt')
var content2 = content.split('\n');
console.log(content2.length)
// var $ = cheerio.load(content);


// fs.writeFileSync('address_strings.json', JSON.stringify(`${content}`.split('\n')));

// JSON.parse()