<b>**This was ammended in folder <em>week-7-a6</em> in order to complete the following assignment. More entries were added and 'PK' was changed to 'breadType' while 'SK' was changed to 'totalTimeHours'</b>
</br>
</br>

<b>Part 1</b>
Create a template for your process blog. I started out pretty vauge with more information to include in my process blog, but after watching the dynamoDB documentation I decided to simplify some areas and expand others.
![image](https://user-images.githubusercontent.com/86888346/137550362-6cbe6e7d-170c-449e-9ddb-42d4ac60f1ab.png)


<b>Part 2</b>
Using the starter code, create a template to insert the information of your process blog. Once the template is created with string, boolean, or number values, you can push the information into the object created. (blogEntries) For now, we are just console logging to confirm the information is there and correct.
![image](https://user-images.githubusercontent.com/86888346/137550578-5e9ae7f0-3724-44f2-b6da-c471095c7e29.png)

<b>Part 3</b>
Lastly, we needed to connect the 2 servers using IAM. Once they are communicating - we can push the data to populate our SQL table. A loop is created using the 'async' function so that we can push all of the blog entries at once.
![image](https://user-images.githubusercontent.com/86888346/137550850-08a8e19a-3513-4c24-8e68-85cac5c3e6af.png)

<b>Part 4</b>
Now, if we check dynamoBD on aws we can see our process blog table has been populated. 
![image](https://user-images.githubusercontent.com/86888346/137551095-aeebb95f-861f-4061-bb68-729df7b7189a.png)

