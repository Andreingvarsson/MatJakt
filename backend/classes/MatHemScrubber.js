const fetch = require("node-fetch");
const Scrubber = require("./Scrubber");

module.exports = class MatHemScrubber extends Scrubber {

  static translateSchemaMatHem = {
    name: (x) => x.name,
    brand: (x) => x.brand.name,
    imageUrl: (x) => x.images.MEDIUM,
    price: (x) => x.price,
    compareProductVolumeUnit: (x) => x.unit,
    productVolume: (x) => x.quantity,
    comparePrice: (x) => x.comparisonPrice,
    compareUnit: (x) => x.comparisonUnit,
    inStock: (x) => x.availability === "AVAILABLE"  ? true : false, 
    eco: (x) => x.badges.length > 0 ? x.badges.filter(x => x.name === "Ekologisk") ? true : false : false,
    Swedish: (x) => x.origin, // x.origin = Recieve the entire object and not only "name"... fix.
    originCountry: (x) => x.origin, // x.origin = Recieve the entire object and not only "name"... fix.
  };
};