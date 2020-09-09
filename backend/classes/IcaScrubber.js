const fetch = require("node-fetch");
const Scrubber = require("./Scrubber");

module.exports = class IcaScrubber extends Scrubber {
  static translateSchemaIca = {
    name: (x) => x.name,
    brand: (x) => x.brand,
    imageUrl: (x) => x.cloudinaryImageId,
    price: (x) => x.price,
    productVolumeUnit: (x) => {if(x.soldInUnit ==="kgm"){return "g"}else if(x.soldInUnit === "pce"){return "st"}},
    productVolume: (x) => x.unitWeight,
    comparePrice: (x) => x.compare.price,
    compareUnit: (x) => x.compare.priceText.match(/[^/]*$/)[0],
    // inStock: (x) => !x.outOfStock,
    eco: (x) => x.markings.environmental ? x.markings.environmental.filter(mark => mark.code === "EU_ORGANIC_FARMING") ? true : false : false,
    Swedish: (x) => x.countryOfOrigin && x.countryOfOrigin.name === 'Sverige'? true : 
                    x.countryOfOrigin && x.countryOfOrigin.name !== 'Sverige' ? false : null,
    originCountry: (x) => x.countryOfOrigin ? x.countryOfOrigin.name : null,
  };
};
