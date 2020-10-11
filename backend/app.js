const express = require("express");
const app = express();
const Harvester = require('./classes/Harvesters/Harvester')
const DbHandler = require('./classes/DBHandler');
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
async function checkForHarvest() {
  var currentDate = Math.round((new Date()).getTime() / 1000);
  var latestFetchDate = db.all('SELECT latestFetch FROM stores WHERE storeId = 1')
  if (currentDate > latestFetchDate[0].latestFetch + (86400)) {
    await Harvester.getWillysProducts();
  }
  latestFetchDate = db.all('SELECT latestFetch FROM stores WHERE storeId = 2')
  if (currentDate > latestFetchDate[0].latestFetch + (86400)) {
    await Harvester.getIcaProducts();
  }
  latestFetchDate = db.all('SELECT latestFetch FROM stores WHERE storeId = 3')
  if (currentDate > latestFetchDate[0].latestFetch + (86400)) {
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
