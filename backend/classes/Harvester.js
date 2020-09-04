const WillysHarvester = require("./WillysHarvester");
const IcaHarvester = require("./IcaHarvester");
const CoopHarvester = require("./WillysHarvester");

module.exports = class Harvester {

  static WillysProducts = [];
  static IcaProducts = [];

  static async getWillysProducts(categoryURL) {
    let products = await WillysHarvester.getProducts(categoryURL);
    this.WillysProducts = products;
    console.log(this.WillysProducts.map((product) => product.name));
  }

  static async getIcaProducts(categoryURL) {

    let items = await IcaHarvester.getProducts(categoryURL);
  //   let products = await IcaHarvester.getProductIds(categoryURL);
  //   let productIds = products.items.map(x => x.id);
    console.log(items)

  //  console.log(productIds)
  }

  static async getIcaCategories(){
    let categorys = await IcaHarvester.getCategories();
    console.log(categorys.childCategories.map(x => x.name))
  }
};

