const fetch = require("node-fetch");
const Scrubber = require("./Scrubber");
const StoreCategories = require("../StoreCategories")

module.exports = class WillysScrubber extends Scrubber {

  static translateSchemaWillys = {
    storeId: (x) => x.storeId = 1,
    categoryId: (x) => this.checkCategory(x), 
    name: (x) => x.name? x.name: 'Unknown',
    brand: (x) => x.manufacturer? x.manufacturer: 'Unknown',
    imageUrl: (x) => x.image && x.image.url ? x.image && x.image.url: 'Unknown',
    //atm looking if there is a discount if there is adjusting price and compareprice
    //Do we want to adjust price to discount price directly or add a discount object with an id?
    price: (x) => this.checkDiscountPrice(x),
    productVolumeUnit: (x) => x.displayVolume.replace(/[0-9\.]|ca: /g, "").replace(/,/,""),
    productVolume: (x) => parseFloat(x.displayVolume.replace(/,/, ".").replace(/ca: /, "")),
    onDiscount: (x) => this.checkIfDiscount(x),
    memberDiscount: (x) => x.potentialPromotions.length >= 1? x.potentialPromotions.campaignType? x.potentialPromotions.campaignType === 'LOYALTY'? true : false : false : false ,
    ordinaryPrice: (x) => x.priceValue? x.priceValue : null,
    comparePrice: (x) => x.potentialPromotions.length >= 1? 
      x.potentialPromotions[0].comparePrice? parseFloat(x.potentialPromotions[0].comparePrice.replace(/,/, ".")) : x.comparePrice ? 
      parseFloat(x.comparePrice.replace(/,/, ".")): 'unknown': x.comparePrice ? parseFloat(x.comparePrice.replace(/,/, ".")) : 'unknown',
    compareUnit: (x) => x.comparePriceUnit? x.comparePriceUnit: 'Unknown' ,
    eco: (x) => x.labels.includes("ecological") ? "true" : "false",
    Swedish: (x) => x.labels.includes("swedish_flag") ? "true" : "false",
    // NodeFetch ERROR Unexpected token N in json at position 0 ?
     originCountry: (x) => 'some country',
    //  async (x) => {
    //   // Seems we need detailed product info for this...
    //   // (one fetch per product - lots of extra time :( )
    //   // maybe ask productOwner if Swedish/non Swedish enough?
    //   let rawData = await fetch(
    //     "https://www.willys.se/axfood/rest/p/" + x.code
    //   );
    //   let data = await rawData.json();
    //   return data.originCountry || data.tradeItemCountryOfOrigin;
    // },
  };

  static checkCategory(x){

    let categories = StoreCategories.getWillysCategories();
    let cat = categories.filter(category => category.title === x.harvestedFromCategory[0])
    return cat[0].categoryId;
  }

  static checkDiscountPrice(x){
    let z = x.potentialPromotions.length >= 1? x.potentialPromotions[0].conditionLabel? x.potentialPromotions[0].conditionLabel.match(/([0-9]+\s)(för)/g)?
    x.priceValue? x.priceValue : null : x.potentialPromotions[0].price.value? x.potentialPromotions[0].price.value: x.priceValue? x.priceValue : null
    : x.priceValue? x.price.value: null : x.priceValue? x.priceValue : null;
    return z;
    // x.potentialPromotions.length >= 1?
    //  x.potentialPromotions[0].price.value ? 
    //  x.potentialPromotions[0].price.value : x.priceValue? x.priceValue : 'Unknown' : x.priceValue? x.priceValue : 'Unknown'
  }

  static checkIfDiscount(x){
    let z = x.potentialPromotions.length >= 1? x.potentialPromotions[0].conditionLabel? x.potentialPromotions[0].conditionLabel.match(/([0-9]+\s)(för)/g)?
    false : true : false : false;

    return z;
  }
 
};
