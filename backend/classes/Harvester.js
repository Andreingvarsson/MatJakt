const WillysHarvester = require("./WillysHarvester");
const WillysScrubber = require("./WillysScrubber");
const MatHemScrubber = require("./MatHemScrubber")
const fs = require('fs') //Added

const IcaHarvester = require("./IcaHarvester");
const IcaScrubber = require("./IcaScrubber");
//const CoopHarvester = require("./CoopHarvester");
const MatHemHarvester = require("./MatHemHarvester");

module.exports = class Harvester {

  static async getWillysProducts() {

    let allProducts = [];
    let categories = await WillysHarvester.getCategories()

    for(let category of categories.children){
      let products = await WillysHarvester.getProducts(category.url);
      for(let product of products){product.harvestedFromCategory = [category.title];}
      allProducts = [...allProducts,...products];
    }
    console.log(allProducts.length)
    let productsToScrub = this.checkForDuplicates(allProducts);
    let scrubbedItems = await WillysScrubber.scrubAllWillysProducts(productsToScrub)
    console.log(scrubbedItems[0], scrubbedItems[2500], scrubbedItems[450], scrubbedItems[5000])
    fs.writeFileSync( './json-to-import/WillysProducts.json', JSON.stringify(scrubbedItems))
  }
  
  static async getIcaProducts(categoryURL) {
    
    let products = await IcaHarvester.getProducts(categoryURL);
    let scrubbedItems = await IcaScrubber.scrubAllIcaProducts(products)
    console.log(scrubbedItems)
    // console.log(products[0].name)
  }
  
  static async getIcaCategories(){
    let categories = await IcaHarvester.getCategories();
    console.log(categories)
    //return categories;
  }

  static async getMatHemCategories(){
    let categories = await MatHemHarvester.getCategories();
    console.log(categories)

  }

  static async getMatHemProducts(categoryURL){
    let products = await MatHemHarvester.getMatHemProducts(categoryURL);
    let scrubbedProducts = await MatHemScrubber.scrubAllMatHemProducts(products);
    console.log(scrubbedProducts[1]);
  }


  static checkForDuplicates(all){
    let idField = 'code';
    let hash = {};
    let allWithNoDuplicates = [];
    for(let product of all){
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
    console.log('Product length before removing duplicates', all.length);
    console.log('Product length after removing duplicates', allWithNoDuplicates.length);
    //console.log("THESE WERE SOME OF THE PREVIOUS DUPLICATES:");
    //console.log(allWithNoDuplicates.filter(x => x.harvestedFromCategory.length > 1).slice(500,510));
    return allWithNoDuplicates;
  }
};

