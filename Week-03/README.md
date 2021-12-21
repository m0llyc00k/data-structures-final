First I used the week03.js file to call the addresses_m01.json from Week-02 and parsed it. The dependencies were already set at the top of the document.

![image](https://user-images.githubusercontent.com/86888346/134096437-399e44ff-7134-4a0a-b2a1-a2971ae73238.png)

Then, I used eachSeries in the async module to iterate over an array and operate on each item in the array in series
![image](https://user-images.githubusercontent.com/86888346/134096478-33c8e7a9-7a53-4223-b88c-f4fe1cfbfb6a.png)

After that, I constructed a querystring from the `query` object's values and appended it to the api URL
![image](https://user-images.githubusercontent.com/86888346/134096504-412e2717-25c7-486a-9e17-f3576599bb51.png)


From there, I used fs.writeFileSync to create a new file that held all of the json data with the geocode information
![image](https://user-images.githubusercontent.com/86888346/134096533-e1251435-57eb-4583-92f0-eec5d02b15b8.png)


After I made the new JSON file with the geocode information, I used a JSON 'beautifier' app on the internet to clean it up and make a new file called 'prettyAddress.json'


I created a JS file called 'prettyAddress.js' to work off of, and I transfered the geocode data to this file so I could continuously refer to it while working. (I probably could have just called from the json file, but found it easier to just copy and paste in this instance)


Lastly, in the prettyAddress.js file, I created a for loop to iterate through all of the addresses and created a new variable where I selected only the data that I needed from this large json document. (Street address, latitude, and longitude). I again added the dependencies on the top of the document.
After pushing these new objects, I wrote a new file using 'writeFileSync' called AddressLatLong.json, where all of my final data is stored.

![image](https://user-images.githubusercontent.com/86888346/134096564-96bbfb5e-73ff-44f8-9d7b-a18207ad2164.png)
