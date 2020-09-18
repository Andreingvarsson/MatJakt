const WillysHarvester = require("./WillysHarvester");
const WillysScrubber = require("../scrubbers/WillysScrubber");
const MatHemHarvester = require("./MatHemHarvester");
const MatHemScrubber = require("../scrubbers/MatHemScrubber")
const IcaHarvester = require("./IcaHarvester");
const IcaScrubber = require("../scrubbers/IcaScrubber");
const DbHandler = require('../DBHandler');
//const fs = require('fs')
const db = new DbHandler('./database/MatJaktDatabase.db');

module.exports = class Harvester {

  static async getWillysProducts() {

    let allProducts = [];
    let categories = await WillysHarvester.getCategories()
    for(let category of categories.children){
      let products = await WillysHarvester.getProducts(category.url);
      for(let product of products){product.harvestedFromCategory = [category.title];}
      allProducts = [...allProducts,...products];
    }
    console.log('Amount of fetched products from Willys: ', allProducts.length)

    let productsToScrub = this.checkForDuplicates({allProducts: allProducts, id: "code" });
    let scrubbedItems = await WillysScrubber.scrubAllWillysProducts(productsToScrub)
    console.log(//scrubbedItems[0], scrubbedItems[1], scrubbedItems[2500], scrubbedItems[450],
      scrubbedItems[5000])
    //fs.writeFileSync( './json-to-import/WillysProducts.json', JSON.stringify(scrubbedItems))
    //var WillysProducts = require('../json-to-import/WillysProducts.json');
    db.run('DELETE FROM products WHERE storeId = 1');
    db.insertMany('products', scrubbedItems);
    console.log("Willys method finished");
  }

  /*static async getIcaProducts() {

    let products = await IcaHarvester.getProducts(categoryURL);
    let scrubbedItems = await IcaScrubber.scrubAllIcaProducts(products)
    console.log(scrubbedItems)
    // console.log(products[0].name)
  }*/
  
  static async getIcaProducts() {
    let allProducts = [];
    let categories = await IcaHarvester.getCategories();

    for (let category of categories.childCategories) {
      let products = await IcaHarvester.getProducts(category.seoUrl);
      for (let product of products) {
        product.harvestedFromCategory = [category.name];
      }
      allProducts = [...allProducts, ...products];
    }
    console.log("Amount of fetched products from Ica: ", allProducts.length);

    let productsToScrub = this.checkForDuplicates({allProducts: allProducts,id: "sku"});
    let scrubbedItems = await IcaScrubber.scrubAllIcaProducts(productsToScrub);
    //db.run('DELETE FROM products WHERE storeId = 2');
    //db.insertMany('products', scrubbedItems);
    
    console.log('Scrubbed Ica products: ')
    console.log(
      //scrubbedItems[0],
      //scrubbedItems[10],
      //scrubbedItems[1500],
      scrubbedItems[10300]
      );
    console.log("Ica method finished");
  }

  static async getMatHemProducts(){
    let allProducts = [];
    let categories = await MatHemHarvester.getCategories();
    for (let category of categories.categories) {
      let products = await MatHemHarvester.getProducts(category.id);
      for (let product of products) {
        product.harvestedFromCategory = [category.title];
      }
      allProducts = [...allProducts, ...products];
    }
    console.log("Amount of fetched products from Mathem: ", allProducts.length);

    let productsToScrub = this.checkForDuplicates({allProducts: allProducts,id: "id"});
    let scrubbedItems = await MatHemScrubber.scrubAllMatHemProducts(productsToScrub);
    //db.run('DELETE FROM products WHERE storeId = 3');
    //db.insertMany('products', scrubbedItems);

    //Inför sprint1 visar enstaka scrubbade produkter
    console.log("Scrubbed Mathem products: ");
    console.log(
      //scrubbedItems[3],
      //scrubbedItems[6],
      //scrubbedItems[204],
      //scrubbedItems[500],
      scrubbedItems[300]
    );
    console.log("Mathem method finished");
  }


  static checkForDuplicates(all){
    let idField = all.id;
    let hash = {};
    let allWithNoDuplicates = [];
    for(let product of all.allProducts){
      if(hash[product[idField]]){
        // i have a duplicate
        // add the extra category harvested from 
        hash[product[idField]].harvestedFromCategory = 
          [...hash[product[idField]].harvestedFromCategory, ...product.harvestedFromCategory];
        // do not add to cleaned array
        continue;
      }
      // add the product with its id field as a key to the hash object
      hash[product[idField]] = product;
      // add to new array with no duplicates
      allWithNoDuplicates.push(product);
    }
    console.log('Amount of products before removing duplicates', all.allProducts.length);
    console.log('Amount of Products after removing duplicates', allWithNoDuplicates.length);
    //console.log("THESE WERE SOME OF THE PREVIOUS DUPLICATES:");
    //console.log(allWithNoDuplicates.filter(x => x.harvestedFromCategory.length > 1).slice(0,10));
    
    return allWithNoDuplicates;
  }
};

