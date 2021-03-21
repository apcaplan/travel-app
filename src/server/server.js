// Require dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const fetch = require("node-fetch");

// Create empty object as an endpoint for all routes
let projectData = {};

// Create instance of app
const app = express();

// Add middleware
// bodyParser to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));
// bodyParser to parse JSON data sent in POST request
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());

// Initialize main project folder
app.use(express.static("dist"));

// Setup server
const port = 8081;

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log(`server listening on port ${port}!`);
});

app.get("/", function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve("dist/index.html"));
});

// load key variables
dotenv.config();

// Define route methods
// GET
app.get("/all", getAll);

function getAll(req, res) {
  console.log("GET request received");
  res.send(projectData);
}

// Helper function to generate url for Geonames search request
const geonamesURL = "http://api.geonames.org/searchJSON?q="
const username = process.env.GEONAMES_USER
const requestUrl = function (city, country) {
  const newUrl = geonamesURL + city + "&maxRows=10" + "&username=" + username
  return newUrl
}

// Fetch location data from Geonames API
app.post("/location", getLocation)

async function getLocation(req, res) {
  console.log("getting location data...")
  console.log("city: ", req.body.city)
  const location = await fetch (requestUrl(req.body.city))
  const geonamesData = await location.json()
  try {
    // console.log(geonamesData)
    projectData.lat = geonamesData.geonames[0].lat
    projectData.long = geonamesData.geonames[0].lng
    projectData.city = geonamesData.geonames[0].name
    projectData.country = geonamesData.geonames[0].countryName
  } catch (error) {
    console.log("error ", error)
  }
  console.log(projectData)
}
