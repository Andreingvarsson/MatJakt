const Harvester = require('./classes/Harvester')
const sqlite3 = require('sqlite3')
const express = require('express')
const util = require('util')

const app = express()

let db = new sqlite3.Database('./MatJakt, SQLite.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

db.serialize(() => {
  db.each(`SELECT storeId as id,
                  name as name
           FROM stores`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + "\t" + row.name);
  });
});




let categoryURL = "Kott-chark-och-fagel/Kott";

// let categoryURLIca = "kott--fagel---fisk-id_1";
let categoryURLIca = "frukt---gront-id_627";

let categoryURLMatHem = "frukt-o-gront";

//db.all(   'SELECT * FROM stores',   (err, stores) => {     for (let store of stores) {       console.log(store.json);    }   });

app.get('/rest/hello', (req, res) => {
    res.json({
        message: 'Hello World'})})

app.get('/rest/stores', async (req, res) => {
    let stores = await db.all('SELECT * FROM stores')

    res.json({stores })
})

app.listen(3000, () => {
console.log('Listening on 3000')
})

//Harvester.getMatHemProducts(categoryURLMatHem)

  // Harvester.getWillysProducts(categoryURL);
  //Harvester.getIcaProducts(categoryURLIca);
  //Harvester.getIcaCategories();
//console.log(products.map(x => x.title))
// let str = "Jfr-pris 207,02 kr/kg";
// const pattern = str.match(/[^/]*$/)[0];
// console.log(pattern)

//Harvester.getMatHemCategories();






