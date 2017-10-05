// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// reservations & waitlist
// =============================================================
var tables = [];
var numTables = 5;
var waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/home", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/clear", function(req, res) {
  waitlist = [];
  tables = [];
  return res.json({success: true});
});

// Search for tables or waitlist
app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newreserve = req.body;
  console.log(newreserve);

  if (tables.length < numTables){
    tables.push(newreserve);
  }
  else {
    waitlist.push(newreserve);
  }

  res.json(newreserve);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});