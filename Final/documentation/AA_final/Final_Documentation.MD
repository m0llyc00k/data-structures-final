<h1>AA Meeting Final Review</h1>
<h2>Molly Cook</h2>

The goal of this project was to scrape all AA data from the below existing site and rework the site into a more comprehensible, user-friendly site.<br>
![image](https://user-images.githubusercontent.com/86888346/146854688-01ed8b7a-9497-4f47-8108-40328a0f8b17.png)

I began this journey by scraping the addresses from the existing AA website link through the following code: <br>
![image](https://user-images.githubusercontent.com/86888346/146854533-c488ff66-5e6e-4409-ada1-9631f872380b.png)

After getting the addresses, I pulled the geocodes using the following code (tamugeo): <br>
![image](https://user-images.githubusercontent.com/86888346/146857019-d3af798c-4a1a-4687-b7a5-2ae7b1c7dbd0.png)
The below is the data that was pulled: <br>
![image](https://user-images.githubusercontent.com/86888346/146855405-5ffe59d6-bd6c-44b3-9749-45e4126341ef.png)

Although I had the latitude and longitude, I had to scrape the remaining data from the sites, and so I scraped for additional meeting, location, and other detailed data. Below is a sample of that code:
![image](https://user-images.githubusercontent.com/86888346/146857134-1d9c9ad8-5845-4144-b149-9c9e56824a94.png)

Here is the result of that all the additional AA data that was scraped:
![image](https://user-images.githubusercontent.com/86888346/146865379-7935c48b-1f53-4a71-bf71-e3e301e89f10.png)

In order to write this code to my database, I had to reformat the structure so that each address and meeting were a single entry, so I reformatted the json further using the below code:<br>
![image](https://user-images.githubusercontent.com/86888346/146857306-40265e65-11c5-4f71-a8db-ca837664cb08.png)

As a result, I made the following json that included more location data, accessibiity details, meeting type, time, etc.: <br>
![image](https://user-images.githubusercontent.com/86888346/146855805-35210459-8ec6-4acd-84ff-0a4d67893e33.png)


After finalizing the json, it was time to write this to the RDS database. Below is a sample of the code:<br>
Creating the database: <br>
![image](https://user-images.githubusercontent.com/86888346/146857883-8d9bf3b6-d2a9-4d4a-a3d6-dc490400d184.png)
Writing to the database: <br>
![image](https://user-images.githubusercontent.com/86888346/146857682-4d8a9dcd-a53a-444f-89da-8656965a6b4d.png)
Calling the data to make sure its all there: <br>
![image](https://user-images.githubusercontent.com/86888346/146857972-a8473bf4-002b-4d80-8ed3-011b7fe9b197.png)
Here is what is logged in the terminal to show the data within the database: <br>
![image](https://user-images.githubusercontent.com/86888346/146858055-0c244550-874f-4274-a7a9-d0cf1952acc2.png)<br>
After having all the data, I used the starter code to map the meetings on a map using leaflet.js. Here is a snapshot of that code: <br>
![image](https://user-images.githubusercontent.com/86888346/146866059-a8bd7602-11e0-4fb5-a057-e07b496ce462.png) <br>
The map looked like this: <br>
![image](https://user-images.githubusercontent.com/86888346/146864485-5a075027-d1d7-4113-b7e2-4e35ae0c0b0d.png)<br>
On click, you are able to create a pop up with the data that was pulled for each meeting in that location: <br>
![image](https://user-images.githubusercontent.com/86888346/146864729-4da66639-ac5d-4d15-9186-9de9092f5cb5.png)


My initial plan was to create an interface that allowed for filtering, sorting, and locating meetings on a map per the below design. With more time and troubleshooting, I think I could have achieved this. <br>
![image](https://user-images.githubusercontent.com/86888346/141022125-61ca4475-0562-4b81-81af-98bdf9be4092.png)



