
<b>Part 1</b>
To begin, I created a basic template for my bread blog. I started out pretty vauge, but after watching the dynamoDB documentation I decided to simplify some areas and expand others.
![image](https://user-images.githubusercontent.com/86888346/137550362-6cbe6e7d-170c-449e-9ddb-42d4ac60f1ab.png)

<b>Part 2</b>
Using the starter code, I created a template to insert the information of my bread blog. Once the template was created with string, boolean, or number values, I pushed the information into the object created. (blogEntries) In this instance, I was just console logging to confirm the information is there and correct.
![image](https://user-images.githubusercontent.com/86888346/137550578-5e9ae7f0-3724-44f2-b6da-c471095c7e29.png)

In this code I queried for wheat bread that took between 7 and 16 hours. The primary keys were Wheat or White bread, and the secondary keys were total time hours spent in making the bread.
![image](https://user-images.githubusercontent.com/86888346/137593213-561e8166-84aa-42af-ac0d-c5248474ce98.png)

Here is my query, shown in the console: 
![image](https://user-images.githubusercontent.com/86888346/137593365-60ab1e9b-704e-4e81-92fa-51397aa85bf0.png)

<b>Part 3</b>
Next, we needed to connect the 2 servers using IAM. Once they were communicating - I pushed the data to populate my SQL table. A loop is created using the 'async' function so that I could push all of the blog entries at once.
![image](https://user-images.githubusercontent.com/86888346/137550850-08a8e19a-3513-4c24-8e68-85cac5c3e6af.png)

We can see the evidenced data in the database here: <br>
![image](https://user-images.githubusercontent.com/86888346/137593288-6f8d409c-0b1b-4f2e-8fbb-245460b41057.png)

<b>Final Result:</b>
Using the starter code, I modified the template to reflect the data in my bread blog. Below is a sample of that code:
![image](https://user-images.githubusercontent.com/86888346/146866944-94ed59d3-2a45-41c4-b690-2e04948ba3ae.png)

Here is a snapshot of the javascript that writes the database to the template: <br>
![image](https://user-images.githubusercontent.com/86888346/146867660-b7114bf9-bef3-4397-97a9-666b9db1007e.png)


Here is the landing page for my bread journal: <br>
![image](https://user-images.githubusercontent.com/86888346/146866237-439feedb-5e99-4b0b-b242-13f7d6421263.png)
Here is the bread when the type query is changed to 'wheat' in the address bar: <br>
![image](https://user-images.githubusercontent.com/86888346/146866287-3950f7c9-63f8-4ec1-a370-22626c566afa.png)
