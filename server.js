// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
app.listen(port, ()=>{ console.log("Listening"); });

app.get('/getProjectData', sendProjectData);
function sendProjectData(req, res){
	res.send(projectData);
}


app.post('/postProjectData', receiveProjectData); 
function receiveProjectData(req, res){
	let data = req.body;
	projectData["temperature"] = data["temperature"];
	projectData["newDate"] = data["newDate"];
	projectData["feeling"] = data["feeling"];
}