const fetch = require("node-fetch");
const Scrubber = require("./Scrubber");
const StoreCategories = require("../StoreCategories")

module.exports = class MatHemScrubber extends Scrubber {
  static translateSchemaMatHem = {
    storeId: (x) => (x.storeId = 3),
    categoryId: (x) => this.checkCategory(x),
    imageUrl: (x) => (x.images ? x.images.MEDIUM : "Unknown"),
    onDiscount: (x) => x.discount && x.discount.discountType === "PRODUCT_DISCOUNT" ? 1 : 0,
    memberDiscount: (x) => x.discount && x.discount.discountType === "PRODUCT_DISCOUNT" ? 1 : 0,
    name: (x) => (x.name ? x.name : "Unknown"),
    brand: (x) => (x.brand.name ? x.brand.name : "Unknown"),
    price: (x) => (x.discount && x.discount.discountType === 'PRODUCT_DISCOUNT'? x.discount.price: x.price? x.price : null),
    comparePrice: (x) => (x.discount && x.discount.discountType === 'PRODUCT_DISCOUNT'? x.discount.comparisonPrice : x.comparisonPrice? x.comparisonPrice : null),
    ordinaryPrice: (x) => (x.price ? x.price : null),
    ordinaryComparePrice: (x) => (x.comparisonPrice ? x.comparisonPrice : null),
    productVolumeUnit: (x) => (x.unit ? x.unit : "Unknown"),
    productVolume: (x) => (x.quantity ? x.quantity : null),
    compareUnit: (x) => (x.comparisonUnit ? x.comparisonUnit : "Unknown"),
    eco: (x) => x.badges.length > 0 ? x.badges.filter((x) => x.name === "Ekologisk") ? 1 : 0 : 0,
    Swedish: (x) => x.origin ? (x.origin.name === "Sverige" ? 1 : 0) : null,
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
