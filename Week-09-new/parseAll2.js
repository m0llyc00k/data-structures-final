// npm install cheerio
var fs = require('fs');
var cheerio = require('cheerio');

var locationDetails = [];
var finalData = []
var finalAddress = []
var meetings = [];


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


fileNumber.forEach(file => {
    // load the AA meeting text file into a variable, `content`, do this for each file
    var content = fs.readFileSync(fileFolder + file);


    // load `content` into a cheerio object
    var $ = cheerio.load(content);


    //call all 'tr' tags
    $('tr').each(function(i, elem) {

        //only show td tags with the below style 
        if ($(elem).attr('style') == 'margin-bottom:10px') {
            //use split and find data details for each location component

            var address = $(elem).html().split('<br>')[2].trim().split(',')[0].split('&amp;')[0].split('@')[0].split('- ')[0].split('Basement')[0].split('Rm')[0].split('(')[0].split('. Meeting')[0].trim() + " New York " + "NY";
            var zipCode = $(elem).text().match(/\d{5}/);
            var zone = file.match(/\d+/)[0];
            var roomDetail = $(elem).html().split('<br>')[2].split(',')[1].split('NY')[0].split('100')[0].trim(); 
            roomDetail = roomDetail.replace('&amp;', '&');
            var directionDetail = $(elem).html().split('<br>')[3].split('NY')[0].split('100')[0].split('(')[1];
            if (directionDetail != null && directionDetail != undefined) {
                var directionDetail = $(elem).html().split('<br>')[3].split('NY')[0].split('100')[0].split('(')[1].split(')')[0];
            } else {
                directionDetail = ''
            }
            
             if (zipCode != null && zipCode != undefined){
                zipCode = zipCode[0]
            };
            
            //clean all direction detail data
            directionDetail = directionDetail.replace('@', 'At');
            directionDetail = directionDetail.replace('Betw.', 'Between');
            directionDetail = directionDetail.replace('Btwn.', 'Between');
            directionDetail = directionDetail.replace('Btw.', 'Between');
            directionDetail = directionDetail.replace('Betw ', 'Between ');
            directionDetail = directionDetail.replace('&amp;', 'and');
            directionDetail = directionDetail.replace('Btween', 'Between');
            directionDetail = directionDetail.replace('  ', ' ');
            
            
            // var meetingType = ($(elem).html().split(' \t\n\t\t\t\t  \t')[1].split('</b>')[0].split('<b>'))
            // var venue = ($(elem).html().split('<b>')[0].split('>')[2].split('<')[0].trim());
            var venue = ($(elem).html().split('<h4 style="margin:0;padding:0;">')[1].split('</h4>')[0]);
            var groupName = ($(elem).html().split('<br>')[1].split('>')[1].split('<')[0].trim().split('(:I')[0].trim());
            var wheelchairAccess = $(elem).text().match(/(Wheelchair access)/);
            if (wheelchairAccess != null && wheelchairAccess != undefined) {
                var wheelchairAccess = 'Yes';
            }
            else {
                var wheelchairAccess = 'No';
            };
            var miscDetails = $(elem).find('div').text().trim();
            var meetingDetails = [];



            //push this into a new object within the above object//


            // var day = ($(elem).html().split(' \t\n\t\t\t\t  \t')[1].split('</b>')[0].split('<b>')[1].split(' ')[0])
            // var startTime = ($(elem).html().split('<br>'))
            // var endTime = 
            // var specialInerest =




            var thisMeeting = {
                address,
                zipCode,
                zone,
                venue,
                roomDetail,
                directionDetail,
                groupName,
                wheelchairAccess,
                miscDetails,
                meetingDetails

            }



            $(elem).find('td').eq(1).each(function(i, elem) {
                if ($(elem).attr('style') == 'border-bottom:1px solid #e3e3e3;width:350px;') {

                    var meetingInfo = $(elem).text().trim();
                    var meetingInfoArray = meetingInfo.split('\n').map(d => d.trim()).filter(Boolean)



                    var meetings = []


                    for (let i = 0; i < meetingInfoArray.length; i++) {

                        // var day = ($(elem).html().split(' \t\n\t\t\t\t  \t')[1].split('</b>')[0].split('<b>')[1].split(' ')[0]);
                        var day = meetingInfoArray[i].split(' ')[0]
                        var startTime = meetingInfoArray[i].split(' ').filter(Boolean)[2]
                        var startTimeAMPM = meetingInfoArray[i].split(' ').filter(Boolean)[3]
                        var trueStartTime = startTime + ' ' + startTimeAMPM;
                        var endTime = meetingInfoArray[i].split(' ').filter(Boolean)[5]
                        var endTimeAMPM = meetingInfoArray[i].split(' ').filter(Boolean)[6]
                        var trueEndTime = endTime + ' ' + endTimeAMPM
                        var type = meetingInfoArray[i].split('Special Interest')[0]
                        var meetingType;
                        var meetingTypeSplit = type.split('Meeting Type')[1];
                        if (meetingTypeSplit != null && meetingTypeSplit != undefined) {
                            meetingType = meetingTypeSplit.trim();
                        }
                        else {
                            meetingType = '';
                        }

                        //   for (var i = 0; i<meetingInfoArray.length; i++) {
                        //     //split on special interest
                        var interest = meetingInfoArray[i].split('Special Interest')[1];
                        var specialInerest;
                        if (interest != null && interest != undefined) {
                            specialInerest = interest.trim();
                        }
                        else {
                            specialInerest = '';
                        }



                        thisMeeting["meetingDetails"].push({
                            day,
                            trueStartTime,
                            trueEndTime,
                            meetingType,
                            specialInerest
                        })
                        // console.log(directionDetail)

                    }






                    // console.log(finalData)



                }
            })

        }

        // thisMeeting["meetingDetails"] = meetings;
        finalData.push(thisMeeting)
        // finalAddress.push(address)

        // console.log(groupName)

    });


})



// fs.writeFileSync('data/allZonesFinal.json', JSON.stringify(finalData));
fs.writeFileSync('data/AllZonesFinal.json', JSON.stringify(finalData));


