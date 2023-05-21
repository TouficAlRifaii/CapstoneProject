# CapstoneProject

## Run the backend:
First of all make sure to download python, mysql server and mysql workbench. 
and make sure pip is added to the path

Then: 
Open a terminal window and then execute the following commands:

`pip install django`

then:  

`pip install djangorestframework`

`pip install mysqlclient`

after that go to the location of the porject `CapstoneProject/lauCourseOffering_Backend`

and then perform: 

`pip install -r requirements.txt`. 

#### how to add the data to the database: 

Open MySQL Workbench and import the `data.sql` file and execute it. 

#### launch the server: 

in the terminal go to the folder again `CapstoneProject/lauCourseOffering_Backend`
and execute: 
`python manage.py runserver`

## Run the front end:
Open a terminal window and navigate to the directory where your React app is located. `CapstoneProject/frontend`
Run the following command to install the dependencies:


`npm install`

### Run the following command in the same directory to start the development server:
`npm start`

The React app will open in your default browser. You can make changes to the code and the changes will be reflected in the browser in real time.


## Here are some additional details about the commands:


- npm install installs the dependencies that are listed in the package.json file. These dependencies are needed to run the React app.


- npm start starts the development server. The development server serves the React app on port 3000. You can access the React app by opening http://localhost:3000 in your browser.

- To close the React app, you can close the terminal window or press Ctrl+C.







