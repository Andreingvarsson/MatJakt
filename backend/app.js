const Harvester = require('./classes/Harvester')
const DbHandler = require('./classes/DBHandler');
const fs = require('fs')

const db = new DbHandler('./database/MatJaktDatabase.db');


//db.run('DROP TABLE IF EXISTS products');
Harvester.getWillysProducts()
//const products = require('./json-to-import/WillysProducts.json');

//db.insertMany('products', products);
//db.run('DELETE FROM products WHERE storeId 1');
//db.run('DELETE FROM products');

/*const all = db.all(

  'SELECT * FROM products',

);


console.log('All products', all);*/



  //Inför sprint1 alla willysProdukter
  Harvester.getWillysProducts();

  //inför sprint1 alla Ica produkter
  //Harvester.getIcaProducts();

  //inför sprint1 alla mathem produkter
  //Harvester.getMatHemProducts();







