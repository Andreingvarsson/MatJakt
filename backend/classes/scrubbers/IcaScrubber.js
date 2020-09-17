const fetch = require("node-fetch");
const Scrubber = require("./Scrubber");
const StorecCategories = require("../StoreCategories")

module.exports = class IcaScrubber extends Scrubber {
  static translateSchemaIca = {
    storeId: (x) => (x.storeId = 2),
    categoryId: (x) => this.checkCategory(x),
    imageUrl: (x) => x.cloudinaryImageId? x.cloudinaryImageId : 'Unknown',
    onDiscount: (x) => x.promotions? x.promotions.priorityPromotion? x.promotions.priorityPromotion.name?
     x.promotions.priorityPromotion.name.match(/([0-9]+\s)(för)/g)? 'false': 'true' : 'false' : 'false' :'false',
    memberDiscount: (x) => x.promotions? x.promotions.priorityPromotion? x.promotions.priorityPromotion.forLoggedIn?
    x.promotions.priorityPromotion.forLoggedIn : 'false' : 'false' : 'false',
    name: (x) => x.name ? x.name : 'Unknown',
    brand: (x) => x.brand ? x.brand : 'Unknown',
    price: (x) => this.checkForDiscountPrice(x),
    comparePrice: (x) => this.checkForDiscountComparePrice(x),
    ordinaryPrice: (x) => x.price? x.price : null,
    ordinarycomparePrice: (x) => x.compare? x.compare.price? x.compare.price : null : null,
    productVolumeUnit: (x) => this.checkProductVolumeUnit(x),
    productVolume: (x) => this.checkProductVolume(x),//x.unitWeight ? x.unitWeight : null,
    compareUnit: (x) => x.compare? x.compare.priceText ? x.compare.priceText.match(/[^/]*$/)[0]:'unknown': 'Unknown',
    eco: (x) => x.markings.environmental ? x.markings.environmental.filter((mark) => mark.code === "EU_ORGANIC_FARMING")? "true"
      : "false" : "false",
    Swedish: (x) => x.countryOfOrigin && x.countryOfOrigin.name === "Sverige" ? "true": x.countryOfOrigin && 
      x.countryOfOrigin.name !== "Sverige" ? "false" : null,
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
    let z =  x.unitWeight? x.unitWeight !== null? x.unitWeight : x.name? parseFloat(x.name.match(/([0-9]+)((?=ml)|(?=g)|(?=kg)|(?=l)|(?=st)|(?=dl))/g)) >= 1 ?
    parseFloat(x.name.match(/([0-9]+)((?=ml)|(?=g)|(?=kg)|(?=l)|(?=st)|(?=dl))/g)[0]) : null : null : x.name? 
    parseFloat(x.name.match(/([0-9]+)((?=ml)|(?=g)|(?=kg)|(?=l)|(?=st)|(?=dl)|(?=dl))/g)) >= 1 ? parseFloat(x.name.match(/([0-9]+)((?=ml)|(?=g)|(?=kg)|(?=l)|(?=st)|(?=dl))/g)[0]) : null: null;
    return z;
  }

  static checkProductVolumeUnit(x){
    if(x.unitWeight !== null && x.soldInUnit === "kgm"){
      return 'g';
    }else {
      if(x.name){
        let str = x.name.match(/\b[0-9]+(l|kg|st|ml|g|dl)\b/g)
        if(str !== null){
          let str1 = str[0].match(/(l|ml|st|ml|g|kg|dl)/g)
          return str1[0]
        }else {
          return null
        }
      }else{
        return null;
      }
    }
  }

  static checkForDiscountPrice(x){
    let z = x.promotions? x.promotions.priorityPromotion? x.promotions.priorityPromotion.name? x.promotions.priorityPromotion.name.match(/([0-9]+\s)(för)/g)? 
    x.price? x.price : null : x.promotions.priorityPromotion.price? x.promotions.priorityPromotion.price : x.price? x.price : null :
    x.price? x.price : null : x.price? x.price: null : x.price? x.price : null;
    return z;
    
  }
    static checkForDiscountComparePrice(x){
      let z = x.promotions? x.promotions.priorityPromotion? x.promotions.priorityPromotion.name? x.promotions.priorityPromotion.name.match(/([0-9]+\s)(för)/g)? 
      x.compare? x.compare.price? x.compare.price : null : null : x.promotions.priorityPromotion.comparePrice? x.promotions.priorityPromotion.comparePrice
      : x.compare? x.compare.price? x.compare.price : null : null : x.compare? x.compare.price? x.compare.price : null : null: 
      x.compare? x.compare.price? x.compare.price: null : null: x.compare? x.compare.price? x.compare.price : null: null;
      return z;
    }
};
