const Harvester = require('./classes/Harvesters/Harvester')
const DbHandler = require('./classes/DBHandler');
const util = require('util')
const db = new DbHandler('./backend/database/MatJaktDatabase.db');
//db.all = util.promisify(db.all)

//db.run('DROP TABLE IF EXISTS products');
//Harvester.getWillysProducts()
//const products = require('./json-to-import/WillysProducts.json');

//db.insertMany('products', products);
//db.run('DELETE FROM products WHERE storeId 1');
//db.run('DELETE FROM products');



const allProducts = db.all(

  'SELECT * FROM products',

);


//console.log('All products', all);



  // //Inför sprint1 alla willysProdukter
  //Harvester.getWillysProducts();

  // //inför sprint1 alla Ica produkter
  //Harvester.getIcaProducts();

  // //inför sprint1 alla mathem produkter
  //Harvester.getMatHemProducts();

const express = require('express');
const app = express();

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

app.get('/api/products/:storeId', (req, res) => {
  let anyProducts = db.all('SELECT * FROM products WHERE storeId = ' + req.params.storeId + " AND WHERE price = 55")
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





