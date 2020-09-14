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
    price: (x) => x.priceValue? x.priceValue : 'Unknown' ,
    productVolumeUnit: (x) => x.displayVolume.replace(/[0-9\.]|ca: /g, ""),
    productVolume: (x) => parseFloat(x.displayVolume.replace(/,/, ".").replace(/ca: /, "")),
    comparePrice: (x) => parseFloat(x.comparePrice.replace(/,/, ".")),
    compareUnit: (x) => x.comparePriceUnit? x.comparePriceUnit: 'Unknown' ,
    eco: (x) => x.labels.includes("ecological") ? "true" : "false",
    Swedish: (x) => x.labels.includes("swedish_flag") ? "true" : "false",
    // NodeFetch ERROR Unexpected token N in json at position 0 ?
     originCountry: (x)=> '',
     //async (x) => {
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
 
};
