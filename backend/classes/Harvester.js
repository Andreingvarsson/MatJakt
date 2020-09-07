const WillysHarvester = require("./WillysHarvester");
const WillysScrubber = require("./WillysScrubber");

const IcaHarvester = require("./IcaHarvester");
const IcaScrubber = require("./IcaScrubber")
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
    let categorys = await IcaHarvester.getCategories();
  }
};

