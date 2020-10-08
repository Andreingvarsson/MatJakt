const express = require('express');
const app = express();
const Harvester = require('./classes/Harvesters/Harvester')
const DbHandler = require('./classes/DBHandler');
const util = require('util')
const db = new DbHandler('./database/MatJaktDatabase.db');



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

app.get('/api/test', (req, res)=>{
   res.json({works: true})
})

app.get('/api/products', (req, res) => {
  const limit = req.query.limit ? ` LIMIT ` + req.query.limit : ''
  let anyProducts = db.all('SELECT * FROM products ' + limit)
  res.json({
    anyProducts
  })
})


app.get('/api/products/:categoryId', (req, res) => {
  let anyProducts = db.all('SELECT * FROM products WHERE categoryId = ' + req.params.categoryId + " ORDER BY price ASC")
  res.json(
    anyProducts
  )
})

app.get('/api/sort', (req, res) => {
  let anyProducts = db.all('SELECT * FROM products WHERE categoryId = 1 OR categoryId = 2 ORDER BY price ASC')
  res.json(
    anyProducts
  )
})


app.use(express.static(__dirname + 'src')) //Hittar nog bara till backend pga __dirname, så kan inte ladda hela mappen för nedanstående del

app.get('*', (req, res) => {
  res.sendFile('index.js', { root: 'src'});
})

app.listen(3001, () => console.log('MatJakt server listening on port 3001'));
