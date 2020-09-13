const Harvester = require('./classes/Harvester')
const DbHandler = require('./classes/DBHandler');
const fs = require('fs')

const db = new DbHandler('./database/MatJaktDatabase.db');



Harvester.getWillysProducts()

const products = require('./json-to-import/WillysProducts.json');

//db.insertMany('products', products);

const all = db.all(

  'SELECT * FROM products',

);

console.log('All products', all);



let categoryURL = "Kott-chark-och-fagel/Kott";

// let categoryURLIca = "kott--fagel---fisk-id_1";
let categoryURLIca = "frukt---gront-id_627";

let categoryURLMatHem = "frukt-o-gront";

//Harvester.getMatHemProducts(categoryURLMatHem)

  //Harvester.getIcaCategories();
  //console.log(categories)
  //Harvester.getIcaProducts(categories);
  //Harvester.getIcaCategories();
//console.log(products.map(x => x.title))
// let str = "Jfr-pris 207,02 kr/kg";
// const pattern = str.match(/[^/]*$/)[0];
// console.log(pattern)

//Harvester.getMatHemCategories();






