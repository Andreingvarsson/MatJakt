const fetch = require("node-fetch");
const Scrubber = require("./Scrubber");

module.exports = class MatHemScrubber extends Scrubber {
  static translateSchemaMatHem = {
    storeId: 3,
    categoryId: 1,
    name: (x) => x.name,
    brand: (x) => x.brand.name,
    imageUrl: (x) => x.images.MEDIUM,
    price: (x) => x.price,
    productVolumeUnit: (x) => x.unit,
    productVolume: (x) => x.quantity,
    comparePrice: (x) => x.comparisonPrice,
    compareUnit: (x) => x.comparisonUnit,
    // inStock: (x) => (x.availability === "AVAILABLE" ? true : false),
    eco: (x) =>
      x.badges.length > 0
        ? x.badges.filter((x) => x.name === "Ekologisk")
          ? true
          : false
        : false,
    Swedish: (x) => (x.origin || {}).name === "Sverige",
    originCountry: (x) => (x.origin || {}).name || "unknown",
  };
};
