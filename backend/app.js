const express = require('express');
const app = express();
const Harvester = require('./classes/Harvesters/Harvester')
const DbHandler = require('./classes/DBHandler');
const util = require('util')
const db = new DbHandler('./database/MatJaktDatabase.db');
//db.all = util.promisify(db.all)
//const { setInterval } = require('timers');

async function getAll() {
  await Harvester.getWillysProducts();
  await Harvester.getIcaProducts();
  await Harvester.getMatHemProducts();
  console.log("All methods finished")
}
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

//*************** trying to fix date converting************************* */
// let date = new Date();
// // let strDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
// // let newstrDate = date.getHours() + ':'+date.getMinutes()+':'+date.getSeconds();
// // let s = strDate + ' ' + newstrDate;
// // let newDate = date.getTime()
// // let sqlDate = date.toISOString();
// // console.log(date)
// let abs = date.getTime();
// console.log(abs)
// //postNewFetchDate(abs)
// let news = new Date(abs)
// console.log(news)

/*var date = Math.round((new Date()).getTime() / 1000);
console.log(date);

function postNewFetchDate(date) {
  db.run('UPDATE stores SET latestFetch = ' + date + ' WHERE storeId = 1')
}
postNewFetchDate(date);*/

//let date = new Date(getLatestFetch(1));
//console.log(date + 'DATE')

//let intervalId;
//checkIfNeedToFetch();
// Förhoppningsvis kollar varje timme om det behövs göra en hämtning till db:n

/*function setCheckFetchInterval(){
  let date = new Date();
  let secondsPastHour = date.getMinutes()*60 + date.getSeconds();
  let interval = setInterval(checkIfNeedToFetch, 60*60*1000 - secondsPastHour*1000)
  return interval;
}*/


/*function getLatestFetch(id){
  let latestFetch = db.all(`SELECT latestFetch FROM stores WHERE storeId = ${id}`);
  console.log(latestFetch[0].latestFetch + ' i fetch')
  return latestFetch[0].latestFetch;

}

function checkIfNeedToFetch(){

  // get latestFetch timestamp from db
  //


  let dateNow = new Date();
  let nextFetchDate = new Date(latestFetchDate.getTime()+1000*60*60*24);
  
  if(dateNow > nextFetchDate){
    // Need to fetch data to db
    clearInterval(intervalId);
    intervalId = setCheckFetchInterval();
    this.getAll();
    // Push a new latestFetch timestamp to db
  }else{
    // Don't need to fetch data to db
    clearInterval(intervalId);
    intervalId = setCheckFetchInterval();
  }
}*/

//TODO, sök efter specifika categorier, sortera efter pris?, efter brand, organic, swedish?, 

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

/*app.get('/api/products/:storeId', (req, res) => {
  let anyProducts = db.all('SELECT * FROM products WHERE storeId = ' + req.params.storeId + " AND WHERE price = 55")
  res.json(
    anyProducts
  )
})*/

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

/* Gets error for missing storeId, don't know why
app.get('/api/products/:storeId', (req, res) => {
  let anyProducts = db.all('SELECT * FROM products WHERE storeId = $storeId', {
    $storeId: req.params.storeId
  })
  res.json(
    anyProducts
  )
})
*/

app.use(express.static(__dirname + 'src')) //Hittar nog bara till backend pga __dirname, så kan inte ladda hela mappen för nedanstående del

app.get('*', (req, res) => {
  res.sendFile('index.js', { root: 'src'});
})

app.listen(3001, () => console.log('MatJakt server listening on port 3001'));
