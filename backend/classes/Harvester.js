const WillysHarvester = require("./WillysHarvester");
const WillysScrubber = require("./WillysScrubber");
const MatHemScrubber = require("./MatHemScrubber")

const IcaHarvester = require("./IcaHarvester");
const IcaScrubber = require("./IcaScrubber");
//const CoopHarvester = require("./CoopHarvester");
const MatHemHarvester = require("./MatHemHarvester");
module.exports = class Harvester {

  static async getWillysProducts(categoryURL) {
    let products = await WillysHarvester.getProducts(categoryURL);
    console.log(products)
    let scrubbedItems = await WillysScrubber.scrubAllWillysProducts(products)
    console.log(scrubbedItems)
  }
  
  static async getIcaProducts(categoryURL) {
    
    let products = await IcaHarvester.getProducts(categoryURL);
    let scrubbedItems = await IcaScrubber.scrubAllIcaProducts(products)
    console.log(scrubbedItems)
    // console.log(products[0].name)
  }
  
  static async getIcaCategories(){
    let categories = await IcaHarvester.getCategories();
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
};

