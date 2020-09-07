const fetch = require("node-fetch");
const Scrubber = require("./Scrubber");

module.exports = class IcaScrubber extends Scrubber {
  static translateSchemaIca = {
    name: (x) => x.name,
    brand: (x) => x.brand,
    imageUrl: (x) => x.cloudinaryImageId,
    price: (x) => x.price,
    // compareProductVolumeUnit: (x) => x.displayVolume.replace(/[0-9\.]|ca: /g, ""),
    // productVolume: (x) => parseFloat(x.displayVolume.replace(/,/, ".").replace(/ca: /, "")),
    comparePrice: (x) => x.compare.price,
    compareUnit: (x) => x.compare.priceText.match(/[^/]*$/)[0],
    // inStock: (x) => !x.outOfStock,
    eco: (x) => x.markings.environmental ? x.markings.environmental.filter(mark => mark.code === "EU_ORGANIC_FARMING") ? true : false : false,
    originCountry: (x) => x.countryOfOrigin ? x.countryOfOrigin.name : null,
    Swedish: (x) => x.countryOfOrigin && x.countryOfOrigin.name === 'Sverige'? true : 
                    x.countryOfOrigin && x.countryOfOrigin.name !== 'Sverige' ? false : null,
  };
};
