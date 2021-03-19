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
const port = 8000;

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
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
