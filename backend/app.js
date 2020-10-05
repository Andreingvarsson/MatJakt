const express = require("express");
const app = express();
const Harvester = require("./classes/Harvesters/Harvester");
const DbHandler = require("./classes/DBHandler");
const util = require("util");
const db = new DbHandler("./database/MatJaktDatabase.db");
//db.all = util.promisify(db.all)
//const { setInterval } = require('timers');

async function getAll() {
  await Harvester.getWillysProducts();
  await Harvester.getIcaProducts();
  await Harvester.getMatHemProducts();
  console.log("All methods finished");
}

// getAll();

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

let date = new Date(getLatestFetch(1));
console.log(date + "DATE");

//let intervalId;
//checkIfNeedToFetch();
// Förhoppningsvis kollar varje timme om det behövs göra en hämtning till db:n

function setCheckFetchInterval() {
  let date = new Date();
  let secondsPastHour = date.getMinutes() * 60 + date.getSeconds();
  let interval = setInterval(
    checkIfNeedToFetch,
    60 * 60 * 1000 - secondsPastHour * 1000
  );
  return interval;
}

function postNewFetchDate(date) {
  db.run("UPDATE stores SET latestFetch = " + date + " WHERE storeId = 1");
}

function getLatestFetch(id) {
  let latestFetch = db.all(
    `SELECT latestFetch FROM stores WHERE storeId = ${id}`
  );
  console.log(latestFetch[0].latestFetch + " i fetch");
  return latestFetch[0].latestFetch;
}

function checkIfNeedToFetch() {
  // get latestFetch timestamp from db
  //

  let dateNow = new Date();
  let nextFetchDate = new Date(latestFetchDate.getTime() + 1000 * 60 * 60 * 24);

  if (dateNow > nextFetchDate) {
    // Need to fetch data to db
    clearInterval(intervalId);
    intervalId = setCheckFetchInterval();
    this.getAll();
    // Push a new latestFetch timestamp to db
  } else {
    // Don't need to fetch data to db
    clearInterval(intervalId);
    intervalId = setCheckFetchInterval();
  }
}

                  //TODO, eco and Swedish 
// ***************************************************************** */
// app.get("/api/products/:eco", (req, res) => {
//   const limit = req.query.limit ? ` LIMIT ` + req.query.limit : "";
//   const page = req.query.page ? ` OFFSET ` + req.query.page * 10 : "";
//   console.log(req.query.limit + " req limit" + req.query.page);
//   let ecoProducts = db.all("SELECT * FROM products WHERE eco = 1 ORDER BY price ASC" +
//   limit +
//   page
//   )
//   res.json(ecoProducts);
// });

// app.get("/api/products/:Swedish", (req, res) => {
//   const limit = req.query.limit ? ` LIMIT ` + req.query.limit : "";
//   const page = req.query.page ? ` OFFSET ` + req.query.page * 10 : "";
//   console.log(req.query.limit + " req limit" + req.query.page);
//   let swedishProducts = db.all("SELECT * FROM products WHERE Swedish = 1 ORDER BY price ASC" +
//   limit +
//   page
//   )
//   res.json(swedishProducts);
// });

// ******************************************************************** */

app.get("/api/test", (req, res) => {
  res.json({ works: true });
});

app.get("/api/products", (req, res) => {
  const limit = req.query.limit ? ` LIMIT ` + req.query.limit : "";
  let anyProducts = db.all("SELECT * FROM products " + limit);
  res.json({
    anyProducts,
  });
});
//******************************************************************************** */
// JUST TRYING SOMETHING FOR FRONTEND!
app.get("/api/categories", (req, res) => {
  // const limit = req.query.limit ? ` LIMIT ` + req.query.limit : ''
  let anyCategories = db.all("SELECT * FROM categories ");
  res.json({
    anyCategories,
  });
});

//******************************************************************************* */
app.get("/api/products/:storeId", (req, res) => {
  console.log("fel" + req);
  let anyProducts = db.all(
    "SELECT * FROM products WHERE storeId = " +
      req.params.storeId +
      " AND WHERE price = 55"
  );
  res.json(anyProducts);
});

//************ CATEGORY PRODUCTS*********************** */
app.get("/api/catProducts/:categoryId", (req, res) => {
  const limit = req.query.limit ? ` LIMIT ` + req.query.limit : "";
  const page = req.query.page ? ` OFFSET ` + req.query.page * 10 : "";
  console.log(req.query.limit + " req limit" + req.query.page);
  let anyProducts = db.all(
    "SELECT * FROM products WHERE categoryId = " +
      req.params.categoryId +
      " ORDER BY price ASC " +
      limit +
      page
  );
  res.json(anyProducts);
});
//*******************SEARCHED PRODUCTS********************** */
// app.get("/api/searchProducts/:searchWord", (req, res) => {
//   const limit = req.query.limit ? ` LIMIT ` + req.query.limit : "";
//   const page = req.query.page ? ` OFFSET ` + req.query.page * 10 : "";
//   console.log(req.query.limit + " req limit" + req.query.page + 'INNNNNEEE I BACK');
//   let anyProducts = db.all(
//     "SELECT categories.name,  products.* FROM products, categories WHERE products.categoryId = categories.categoryId AND products.name LIKE "+"'"+"%"+req.params.searchWord+"%"+"'"+" ORDER BY  INSTR("+"'"+"Fryst, Skafferi Djur"+"'"+", categories.name), length(products.name) ASC" + limit + page
//   );
//   res.json(anyProducts);
// });



 /************************SEARCH ECO/SWEDISH/ALL ATTEMPT*************************************** */

 app.get("/api/searchProducts/:searchWord", (req, res) => {
  const limit = req.query.limit ? ` LIMIT ` + req.query.limit : "";
  const page = req.query.page ? ` OFFSET ` + req.query.page * 10 : "";
  const eco = req.query.eco;
  const swe = req.query.swe;
  console.log(req.query.limit + " req limit" + req.query.page + 'INNNNNEEE I BACK');
  console.log(eco);
  if(eco === 'true' && swe === 'true'){
    let products = db.all(
      "SELECT categories.name, products.* FROM products, categories WHERE products.categoryId = categories.categoryId AND products.name LIKE "+"'"+"%"+req.params.searchWord+"%"+"'"+" AND products.eco = 1 AND products.Swedish = 1 ORDER BY  INSTR("+"'"+"Fryst, Skafferi Djur"+"'"+", categories.name), length(products.name) ASC" + limit + page
    )
    return res.json(products)
  }else if(eco === 'true'){
    console.log('ECO TRUE')
    let ecoProducts = db.all(
    "SELECT categories.name, products.* FROM products, categories WHERE products.categoryId = categories.categoryId AND products.name LIKE "+"'"+"%"+req.params.searchWord+"%"+"'"+" AND products.eco = 1 ORDER BY  INSTR("+"'"+"Fryst, Skafferi Djur"+"'"+", categories.name), length(products.name) ASC" + limit + page
    )
    return res.json(ecoProducts)

  }else if(swe === 'true'){
    let swedishProducts = db.all(
      "SELECT categories.name, products.* FROM products, categories WHERE products.categoryId = categories.categoryId AND products.name LIKE "+"'"+"%"+req.params.searchWord+"%"+"'"+" AND products.Swedish = 1 ORDER BY  INSTR("+"'"+"Fryst, Skafferi Djur"+"'"+", categories.name), length(products.name) ASC" + limit + page
      )
     return res.json(swedishProducts);
  }
  let anyProducts = db.all(
    "SELECT categories.name,  products.* FROM products, categories WHERE products.categoryId = categories.categoryId AND products.name LIKE "+"'"+"%"+req.params.searchWord+"%"+"'"+" ORDER BY  INSTR("+"'"+"Fryst, Skafferi Djur"+"'"+", categories.name), length(products.name) ASC" + limit + page
  );
  return res.json(anyProducts);
});

//**********************COMPARE PRODUCTS******************* */
app.get("/api/compareProducts/:product", (req, res) => {
  let compareProducts = [];

  req.params.productsInList.forEach((product) => {
    let productFromDb = db.all(
      // Attempt a query - check productCategory if they have the same category - gather. 
      // split() name on 'space' = " ", so we get all the words in the name.
      // sort on storeId, cost/ kg/l price?
      // Somehow create a list of ICA, Willys, MatHem, based on our productsInList list. 
      

      "SELECT brand, name, storeId FROM products WHERE ***somethingSOMETHING*** products.name LIKE "+"'"+"%"+req.params.product+"%"+"'"+""
    )
  })
  res.json(productFromDb);
  // compareProducts.push(productFromDb)
  compareProducts = [...compareProducts, productFromDb]
  return compareProducts;
});


app.get("/api/sort", (req, res) => {
  let anyProducts = db.all(
    "SELECT * FROM products WHERE categoryId = 1 OR categoryId = 2 ORDER BY price ASC"
  );
  res.json(anyProducts);
});

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

app.use(express.static(__dirname + "src")); //Hittar nog bara till backend pga __dirname, så kan inte ladda hela mappen för nedanstående del

app.get("*", (req, res) => {
  res.sendFile("index.js", { root: "src" });
});

app.listen(3001, () => console.log("MatJakt server listening on port 3001"));
