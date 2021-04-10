/*
		---WORKFLOW---
app => GET Request 	=> OpenWeatherMap
  <= res.send(temperature) <= 

app => POSTs temperature, newDate, feeling to => server to save it to projectData



app => GET Request => server
 <= res.send(projectData) <=
app => Updates UI

*/


/* Global Variables */
const apiKey = 'c2eeee4e304d9fab3b1641ecc2f342c5';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();//ex: "10.4.2021"
/* http://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=c2eeee4e304d9fab3b1641ecc2f342c5 */


//document.getElementById('generate').addEventListener('click', performChainedActions);
const generateBtn = document.getElementById('generate');
generateBtn.addEventListener('click', performChainedActions);

function performChainedActions(e){
	const zipCode = document.getElementById("zip").value;//ex: 94040
	const feeling = document.getElementById("feelings").value;

	e.preventDefault();
	if(zipCode !== ''){
		alert(zipCode);
	    generateBtn.classList.remove('invalid');
	    getWeatherData(`${baseUrl}?q=${zipCode}&appid=${apiKey}`)
		.then((temperature)=>{postProjectData('/postProjectData', {"temperature":temperature, "feeling":feeling, "newDate":newDate})})
		.then(()=>{getProjectDataAndUpdateUI('/getProjectData');})
		.catch((error)=>{console.log("error", error);});
	}else{
		alert("Invalid");
		alert(zipCode);
		alert(feeling);
	    generateBtn.classList.add('invalid');
	}
}
//Async GET Request to OpenWeatherMap to get temperature
const getWeatherData = async (url = '') =>{ 
  const response = await fetch(url);
  try{
  	// Transform into JSON
  	const weatherData = await response.json();
  	const main = weatherData["main"];
  	const temperature = main["temp"];
  	return temperature;

  }
  catch(error){
    console.log("error", error); // appropriately handle the error
  }
};




// Async POST Request to set projectData in server
const postProjectData = async (url = '', data = {})=>{
    const response = await fetch(url, {
	    method: 'POST', 
	    credentials: 'same-origin', 
	    headers: {
	        'Content-Type': 'application/json',
	    },
	    body: JSON.stringify(data), // body data type must match "Content-Type" header        
	});
    try{
    	console.log("Posted projectData");
    }catch(error) {
    	console.log("error", error);
    }
};

//GET Request to server to get projectData
const getProjectDataAndUpdateUI = async (url='') =>{ 
  const request = await fetch(url);
  try {
  	// Transform into JSON
  	const projectData = await request.json();
  	document.getElementById("date").innerHTML = projectData["newDate"];
	document.getElementById("temp").innerHTML = projectData["temperature"];
	document.getElementById("content").innerHTML = projectData["feeling"];

  }
  catch(error) {
    console.log("error", error); // appropriately handle the error
  }
};

