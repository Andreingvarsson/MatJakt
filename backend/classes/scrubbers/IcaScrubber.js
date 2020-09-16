const fetch = require("node-fetch");
const Scrubber = require("./Scrubber");
const StorecCategories = require("../StoreCategories")

module.exports = class IcaScrubber extends Scrubber {
  static translateSchemaIca = {
    storeId: (x) => (x.storeId = 2),
    categoryId: (x) => this.checkCategory(x),
    name: (x) => x.name ? x.name : 'Unknown',
    brand: (x) => x.brand ? x.brand : 'Unknown',
    imageUrl: (x) => x.cloudinaryImageId? x.cloudinaryImageId : 'Unknown',
    price: (x) => x.price? x.price : null,
    productVolumeUnit: (x) => this.checkProductVolumeUnit(x),
    productVolume: (x) => this.checkProductVolume(x),//x.unitWeight ? x.unitWeight : null,
    comparePrice: (x) => x.compare? x.compare.price? x.compare.price : null : null,
    compareUnit: (x) => x.compare? x.compare.priceText ? x.compare.priceText.match(/[^/]*$/)[0]:'unknown': 'Unknown',
    eco: (x) =>
      x.markings.environmental
        ? x.markings.environmental.filter(
            (mark) => mark.code === "EU_ORGANIC_FARMING"
          )
          ? "true"
          : "false"
        : "false",
    Swedish: (x) =>
      x.countryOfOrigin && x.countryOfOrigin.name === "Sverige"
        ? "true"
        : x.countryOfOrigin && x.countryOfOrigin.name !== "Sverige"
        ? "false"
        : null,
    originCountry: (x) => (x.countryOfOrigin ? x.countryOfOrigin.name : 'Unknown'),
  };

  static checkCategory(x) {
    let categories = StorecCategories.getIcaCategories();
    let cat = categories.filter(
      (category) => category.title === x.harvestedFromCategory[0]
    );
    return cat[0].categoryId;
  }

  static checkProductVolume(x){
    let z =  x.unitWeight? x.unitWeight !== null? x.unitWeight : x.name? parseFloat(x.name.match(/([0-9]+)((?=ml)|(?=g)|(?=kg)|(?=l)|(?=st))/g)) >= 1 ?
    parseFloat(x.name.match(/([0-9]+)((?=ml)|(?=g)|(?=kg)|(?=l)|(?=st))/g)[0]) : null : null : x.name? 
    parseFloat(x.name.match(/([0-9]+)((?=ml)|(?=g)|(?=kg)|(?=l)|(?=st))/g)) >= 1 ? parseFloat(x.name.match(/([0-9]+)((?=ml)|(?=g)|(?=kg)|(?=l)|(?=st))/g)[0]) : null: null;
    return z;
  }

  static checkProductVolumeUnit(x){
    if(x.unitWeight !== null && x.soldInUnit === "kgm"){
      return 'g';
    }else {
      if(x.name){
        let str = x.name.match(/\b[0-9]+(l|kg|st|ml|g)\b/g)
        if(str !== null){
          let str1 = str[0].match(/(l|ml|st|ml|g|kg)/g)
          return str1[0]
        }else {
          return null
        }
      }else{
        return null;
      }
    }
  }
};
