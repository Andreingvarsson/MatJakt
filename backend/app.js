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




// //************ CATEGORY PRODUCTS*********************** */
// app.get("/api/catProducts/:categoryId", (req, res) => {
//   const limit = req.query.limit ? ` LIMIT ` + req.query.limit : "";
//   const page = req.query.page ? ` OFFSET ` + req.query.page * 10 : "";
//   const eco = req.query.eco;
//   const swe = req.query.swe;
//   console.log(req.query.limit + " req limit" + req.query.page);
//   if(eco === 'true' && swe === 'true'){
//     let products = db.all(
//       "SELECT * FROM products WHERE categoryId = " +req.params.categoryId +" AND products.eco = 1 AND products.Swedish = 1 ORDER BY price ASC " + limit + page
//       )
//       return res.json(products)
//   }else if(eco === 'true'){
//     let products = db.all(
//     "SELECT * FROM products WHERE categoryId = " +req.params.categoryId +" AND products.eco = 1 ORDER BY price ASC " + limit + page
//     )
//     return res.json(products)
//   }else if(swe === 'true'){
//     let products = db.all(
//     "SELECT * FROM products WHERE categoryId = " +req.params.categoryId +" AND products.Swedish = 1 ORDER BY price ASC " + limit + page
//     )
//     return res.json(products)
//   }
//   let anyProducts = db.all(
//     "SELECT * FROM products WHERE categoryId = " +req.params.categoryId +" ORDER BY price ASC " + limit + page
//   );
//   return res.json(anyProducts);
// });


//  /************************SEARCH ECO/SWEDISH/ALL ATTEMPT*************************************** */

//  app.get("/api/searchProducts/:searchWord", (req, res) => {
//   const limit = req.query.limit ? ` LIMIT ` + req.query.limit : "";
//   const page = req.query.page ? ` OFFSET ` + req.query.page * 10 : "";
//   const eco = req.query.eco;
//   const swe = req.query.swe;
//   console.log(req.query.limit + " req limit" + req.query.page + 'INNNNNEEE I BACK');
//   console.log(eco);
//   if(eco === 'true' && swe === 'true'){
//     let products = db.all(
//       "SELECT categories.name, products.* FROM products, categories WHERE products.categoryId = categories.categoryId AND products.name LIKE "+"'"+"%"+req.params.searchWord+"%"+"'"+" AND products.eco = 1 AND products.Swedish = 1 ORDER BY  INSTR("+"'"+"Fryst, Skafferi Djur"+"'"+", categories.name), length(products.name) ASC" + limit + page
//     )
//     return res.json(products)
//   }else if(eco === 'true'){
//     console.log('ECO TRUE')
//     let ecoProducts = db.all(
//     "SELECT categories.name, products.* FROM products, categories WHERE products.categoryId = categories.categoryId AND products.name LIKE "+"'"+"%"+req.params.searchWord+"%"+"'"+" AND products.eco = 1 ORDER BY  INSTR("+"'"+"Fryst, Skafferi Djur"+"'"+", categories.name), length(products.name) ASC" + limit + page
//     )
//     return res.json(ecoProducts)

//   }else if(swe === 'true'){
//     let swedishProducts = db.all(
//       "SELECT categories.name, products.* FROM products, categories WHERE products.categoryId = categories.categoryId AND products.name LIKE "+"'"+"%"+req.params.searchWord+"%"+"'"+" AND products.Swedish = 1 ORDER BY  INSTR("+"'"+"Fryst, Skafferi Djur"+"'"+", categories.name), length(products.name) ASC" + limit + page
//       )
//      return res.json(swedishProducts);
//   }
//   let anyProducts = db.all(
//     "SELECT categories.name,  products.* FROM products, categories WHERE products.categoryId = categories.categoryId AND products.name LIKE "+"'"+"%"+req.params.searchWord+"%"+"'"+" ORDER BY  INSTR("+"'"+"Fryst, Skafferi Djur"+"'"+", categories.name), length(products.name) ASC" + limit + page
//   );
//   return res.json(anyProducts);
// });


app.use(express.static(__dirname + "src")); 

app.get("*", (req, res) => {
  res.sendFile("index.js", { root: "src" });
});

app.listen(3001, () => console.log("MatJakt server listening on port 3001"));
