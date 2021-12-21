// npm install cheerio
var fs = require('fs');
var cheerio = require('cheerio');

var locationDetails = [];
var finalData = []


// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
var fileFolder = 'data/';
var fileNumber = [
    'm01.txt',
    'm02.txt',
    'm03.txt',
    'm04.txt',
    'm05.txt',
    'm06.txt',
    'm07.txt',
    'm08.txt',
    'm09.txt',
    'm10.txt'
];


fileNumber.forEach(address => {
            // load the AA meeting text file into a variable, `content`, do this for each file
            var content = fs.readFileSync(fileFolder + address);


            // load `content` into a cheerio object
            var $ = cheerio.load(content);
                        

            //call all 'tr' tags
            $('tr').each(function(i, elem) {
                        //only show td tags with the below style 
                        if ($(elem).attr('style') == 'margin-bottom:10px') {
                            //use split and find data details for each location component
                            var address = $(elem).html().split('<br>')[2].trim().split(',')[0];
                            // var zipCode = $(elem).text().match(/\d{5}/);
                            var roomDetail = $(elem).html().split('<br>')[2].split(',')[1].trim();
                            var directionDetail = $(elem).html().split('<br>')[3].split('NY')[0].split('100')[0].split('(')[1];
                            if (directionDetail != null && directionDetail != undefined) {
                                var directionDetail = $(elem).html().split('<br>')[3].split('NY')[0].split('100')[0].split('(')[1].split(')')[0];
                            }
                            // var meetingType = ($(elem).html().split(' \t\n\t\t\t\t  \t')[1].split('</b>')[0].split('<b>'))
                            var venue = ($(elem).html().split('<b>')[0].split('>')[1].split('<')[0].trim());
                            var groupName = ($(elem).html().split('<br>')[1].split('>')[1].split('<')[0].trim().split('(:I')[0].trim());
                            var wheelchairAccess = $(elem).text().match(/(Wheelchair access)/);
                            if (wheelchairAccess != null && wheelchairAccess != undefined) {
                                var wheelchairAccess = 'Yes';
                            } else {
                                var wheelchairAccess = 'No';
                            };
                            var miscDetails = $(elem).find('div').text().trim();
                        
                

                            //push this into a new object within the above object//


                            // var day = ($(elem).html().split(' \t\n\t\t\t\t  \t')[1].split('</b>')[0].split('<b>')[1].split(' ')[0])
                            // var startTime = ($(elem).html().split('<br>'))
                            // var endTime = 
                            // var specialInerest =




                                    locationDetails.push({
                                        address,
                                        venue,
                                        roomDetail,
                                        directionDetail,
                                        groupName,
                                        wheelchairAccess,
                                        miscDetails
                                    })


            
            
                                }
// td:nth-of-type(2)
                            // var locationDetails = locationData;
                            var meetings = []
            
                            // $(elem).find('td').text().split('\n').map( d => d.trim()).filter(Boolean).forEach(function(e,idx){
                                    $(elem).find('td').eq(1).each(function(i, elem) {
                                        if ($(elem).attr('style') == 'border-bottom:1px solid #e3e3e3;width:350px;') {
                                
                                  var meetingInfo = $(elem).text().trim();  
                                  var meetingInfoArray = meetingInfo.split('\n').map( d => d.trim()).filter(Boolean)
                                  
                                              for (var i = 0; i<meetingInfoArray.length; i++){
                                                  var day = ($(elem).html().split(' \t\n\t\t\t\t  \t')[1].split('</b>')[0].split('<b>')[1].split(' ')[0]);
                                                  var startTime = ($(elem).html().split(' ').filter(Boolean)[6])
                                                  var startTimeAMPM = ($(elem).html().split(' ').filter(Boolean)[7])
                                                  var trueStartTime = startTime + ' ' + startTimeAMPM;
                                                  var endTime = ($(elem).html().split(' ').filter(Boolean)[9])
                                                  var endTimeAMPM = ($(elem).html().split(' ').filter(Boolean)[10])
                                                  var trueEndTime = endTime + ' ' + endTimeAMPM
                                                  var meetingType = ($(elem).html().split(' ').filter(Boolean)[13])
                                                  
                                              }
                                              for (var i = 0; i<meetingInfoArray.length; i++) {
                                                //split on special interest
                                                var interest = meetingInfoArray[i].split('Special Interest')[1];
                                                var specialInerest;
                                                if (interest) {
                                                    specialInerest = interest.trim();
                                                } else {
                                                    specialInerest = '';
                                                }}


                              meetings.push({
                                      day,
                                      trueStartTime,
                                      trueEndTime,
                                      meetingType,
                                      specialInerest
                                      })




                            // console.log(finalData)
                                    
                                    
                                 
                         }
                            })


                          
            
                            });


                        })

                            



                    fs.writeFileSync('data/allZones.json', JSON.stringify(finalData));    
                    




// $(elem).find('td:nth-of-type(2)').text().split('\n').map( d => d.trim()).filter(Boolean).forEach(function(e,idx)