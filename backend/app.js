// const path = require("path");
const Harvester = require("./classes/Harvesters/Harvester");

// const DbHandler = require("./classes/DBHandler");
// const { exit } = require("process");
// //const fs = require('fs')
// const db = new DbHandler(path.join(__dirname, "database/MatJaktDatabase.db"));

//********************************************************************************* */
// db.run('DROP TABLE IF EXISTS products');
//Harvester.getWillysProducts()
//const products = require('./json-to-import/WillysProducts.json');

//db.insertMany('products', products);
//db.run('DELETE FROM products WHERE storeId 1');
//db.run('DELETE FROM products');

/*const all = db.all(

  'SELECT * FROM products WHERE storeId = 1',

);


console.log('All products', all);*/

// //Inför sprint1 alla willysProdukter
//Harvester.getWillysProducts();

// //inför sprint1 alla Ica produkter
//Harvester.getIcaProducts();

// //inför sprint1 alla mathem produkter
Harvester.getMatHemProducts();
//////******************************************************************* */
// const express = require("express");
// const app = express();

// app.get("/api/test", (req, res) => {
//   res.json({ works: true });
// });

// app.listen(3001, () => console.log("server listening on port 3001"));
