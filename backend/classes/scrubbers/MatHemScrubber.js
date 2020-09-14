const fetch = require("node-fetch");
const Scrubber = require("./Scrubber");
const StoreCategories = require("../StoreCategories")

module.exports = class MatHemScrubber extends Scrubber {
  static translateSchemaMatHem = {
    storeId: (x) => x.storeId = 3,
    categoryId: (x) => this.checkCategory(x),
    name: (x) => x.name ? x.name : 'Unknown',
    brand: (x) => x.brand.name ? x.brand.name: 'Unknown',
    imageUrl: (x) => x.images? x.images.MEDIUM : 'Unknown',
    price: (x) => x.price? x.price : null,
    productVolumeUnit: (x) => x.unit? x.unit: 'Unknown',
    productVolume: (x) => x.quantity? x.quantity : null,
    comparePrice: (x) => x.comparisonPrice? x.comparisonPrice : null,
    compareUnit: (x) => x.comparisonUnit? x.comparisonUnit: 'Unknown',
    eco: (x) =>
      x.badges.length > 0
        ? x.badges.filter((x) => x.name === "Ekologisk")
          ? "true"
          : "false"
        : "false",
    Swedish: (x) => x.origin ? x.origin.name === "Sverige" ? "true" : "false" : null,
    originCountry: (x) => (x.origin || {}).name || "Unknown",
  };

  static checkCategory(x) {
    let categories = StoreCategories.getMatHemCategories();
    let cat = categories.filter(
      (category) => category.title === x.harvestedFromCategory[0]
    );
    return cat[0].categoryId;
  }
};
