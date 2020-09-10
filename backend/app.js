const Harvester = require('./classes/Harvester')
const DbHandler = require('./classes/DBHandler');

const db = new DbHandler('./database/MatJaktDatabase.db');

// Write some data to the database

// (...any array of objects will do as long as the objects

//  have the same property names as the fields in the db table)

const stores = require('./json-to-import/stores.json');

db.insertMany('stores', stores);



const all = db.all(

  'SELECT * FROM stores',

);

console.log('All stores', all);



let categoryURL = "Kott-chark-och-fagel/Kott";

// let categoryURLIca = "kott--fagel---fisk-id_1";
let categoryURLIca = "frukt---gront-id_627";

let categoryURLMatHem = "frukt-o-gront";

//Harvester.getMatHemProducts(categoryURLMatHem)

  Harvester.getWillysProducts();
  //Harvester.getIcaCategories();
  //console.log(categories)
  //Harvester.getIcaProducts(categories);
  //Harvester.getIcaCategories();
//console.log(products.map(x => x.title))
// let str = "Jfr-pris 207,02 kr/kg";
// const pattern = str.match(/[^/]*$/)[0];
// console.log(pattern)

//Harvester.getMatHemCategories();






