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


//let intervalId;
//checkIfNeedToFetch();
// Förhoppningsvis kollar varje timme om det behövs göra en hämtning till db:n
function setCheckFetchInterval(){
  let date = new Date();
  let secondsPastHour = date.getMinutes()*60 + date.getSeconds();
  let interval = setInterval(checkIfNeedToFetch, 60*60*1000 - secondsPastHour*1000)
  return interval;
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
}




// getAll();

//db.run('DROP TABLE IF EXISTS products');
//const products = require('./json-to-import/WillysProducts.json');

//db.insertMany('products', products);
//db.run('DELETE FROM products WHERE storeId 1');
//db.run('DELETE FROM products');




/*const allProducts = db.all(

  'SELECT * FROM products',

);*/

async function getAll() {
  await Harvester.getWillysProducts();
  //await Harvester.getIcaProducts();
  //await Harvester.getMatHemProducts();
} 

getAll();
//console.log('All products', all);

// //Inför sprint1 alla willysProdukter

// //inför sprint1 alla Ica produkter

// //inför sprint1 alla mathem produkter



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
