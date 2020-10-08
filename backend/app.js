const express = require("express");
const app = express();
const Harvester = require('./classes/Harvesters/Harvester')
const DbHandler = require('./classes/DBHandler');
const util = require('util')
const db = new DbHandler('./database/MatJaktDatabase.db');
const APIHandler = require("./classes/APIHandler");
const api = new APIHandler("./classes/APIHandler");



//Runs the function every hour
//It will the set time before running it from start, add a single function call to check at startup
setInterval(() => {
  checkForHarvest();
}, 3600000);

//Checks the current date and compares it to the dates for each harvest/fetch for the stores
//If it has been 24 hours (86400 seconds) since the last fetch it will run the harvest functions
//TODO, clean up console/make it more readable
async function checkForHarvest() {
  console.log('\n' + Date().toString('yyyy-MM-d-h-mm-ss') + '\n' + "Checking if harvest is needed" + '\n')
  var currentDate = Math.round((new Date()).getTime() / 1000);
  var latestFetchDate = db.all('SELECT latestFetch FROM stores WHERE storeId = 1')
  console.log("Current date: " + currentDate + '\n')
  console.log("Latest Willys fetch: " + latestFetchDate[0].latestFetch)
  if (currentDate > latestFetchDate[0].latestFetch + (86400)) {
    console.log("Fetching Willys data");
    await Harvester.getWillysProducts();
  }
  latestFetchDate = db.all('SELECT latestFetch FROM stores WHERE storeId = 2')
  console.log("Latest Ica fetch: " + latestFetchDate[0].latestFetch)
  if (currentDate > latestFetchDate[0].latestFetch + (86400)) {
    console.log("Fetching Ica data");
    await Harvester.getIcaProducts();
  }
  latestFetchDate = db.all('SELECT latestFetch FROM stores WHERE storeId = 3')
  console.log("Latest MatHem fetch: " + latestFetchDate[0].latestFetch)
  if (currentDate > latestFetchDate[0].latestFetch + (86400)) {
    console.log("Fetching MatHem data");
    await Harvester.getMatHemProducts();    
  }
}

app.get("/api/categories", api.categories);

app.get("/api/catProducts/:categoryId", api.categoryProducts);

app.get("/api/searchProducts/:searchWord", api.searchedProducts);


app.use(express.static(__dirname + "src")); 

app.get("*", (req, res) => {
  res.sendFile("index.js", { root: "src" });
});

app.listen(3001, () => console.log("MatJakt server listening on port 3001"));
