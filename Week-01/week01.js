// // npm install got
// // mkdir data

const fs = require('fs');
const got = require('got');


(async () => {
	try {
	const urls = [
		'https://parsons.nyc/aa/m01.html',
		'https://parsons.nyc/aa/m02.html',
		'https://parsons.nyc/aa/m03.html',
		'https://parsons.nyc/aa/m04.html',
		'https://parsons.nyc/aa/m05.html',
		'https://parsons.nyc/aa/m06.html',
		'https://parsons.nyc/aa/m07.html',
		'https://parsons.nyc/aa/m08.html',
		'https://parsons.nyc/aa/m09.html',
		'https://parsons.nyc/aa/m10.html'   
	];
	const fileNames = [
		'/home/ec2-user/environment/Week-01/data/m01.txt',
		'/home/ec2-user/environment/Week-01/data/m02.txt',
		'/home/ec2-user/environment/Week-01/data/m03.txt',
		'/home/ec2-user/environment/Week-01/data/m04.txt',
		'/home/ec2-user/environment/Week-01/data/m05.txt',
		'/home/ec2-user/environment/Week-01/data/m06.txt',
		'/home/ec2-user/environment/Week-01/data/m07.txt',
		'/home/ec2-user/environment/Week-01/data/m08.txt',
		'/home/ec2-user/environment/Week-01/data/m09.txt',
		'/home/ec2-user/environment/Week-01/data/m10.txt'   
	];
	
		
		for (let j = 0; j < urls.length; j++){
			const response = await got(urls[j]);
    		fs.writeFileSync(fileNames[j], response.body);
			}
		//=> '<!doctype html> ...'
	} catch (error) {
		console.log(error.response.body);
		//=> 'Internal server error ...'
	}
	
})();





//try to make a loop instead of iterating it 10x
//different files in the same folder

