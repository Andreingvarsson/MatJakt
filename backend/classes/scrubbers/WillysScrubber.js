const fetch = require("node-fetch");
const Scrubber = require("./Scrubber");
const StoreCategories = require("../StoreCategories")

module.exports = class WillysScrubber extends Scrubber {
  static translateSchemaWillys = {
    storeId: (x) => (x.storeId = 1),
    categoryId: (x) => this.checkCategory(x),
    imageUrl: (x) =>
      x.image && x.image.url ? x.image && x.image.url : "Unknown",
    onDiscount: (x) => this.checkIfDiscount(x),
    memberDiscount: (x) => x.potentialPromotions.length >= 1 ? x.potentialPromotions.campaignType?
      x.potentialPromotions.campaignType === "LOYALTY" ? 1 : 0 : 0 : 0,
    name: (x) => (x.name ? x.name : "Unknown"),
    brand: (x) => (x.manufacturer ? x.manufacturer : "Unknown"),
    price: (x) => this.checkDiscountPrice(x),
    comparePrice: (x) => this.checkDiscountComparePrice(x),
    ordinaryPrice: (x) => (x.priceValue ? x.priceValue : null),
    ordinaryComparePrice: (x) => x.comparePrice ? parseFloat(x.comparePrice.replace(/,/, ".")): null,
    productVolumeUnit: (x) => x.displayVolume.replace(/[0-9\.]|ca: /g, "").replace(/,/, ""),
    productVolume: (x) => parseFloat(x.displayVolume.replace(/,/, ".").replace(/ca: /, "")),
    compareUnit: (x) => x.comparePriceUnit ? x.comparePriceUnit : "Unknown",
    eco: (x) => (x.labels.includes("ecological") ? 1 : 0),
    Swedish: (x) => (x.labels.includes("swedish_flag") ? 1 : 0),
    originCountry: async (x) => {
      let rawData = await fetch(
        "https://www.willys.se/axfood/rest/p/" + x.code
      );
      let data = await rawData.json();
      return data.originCountry || data.tradeItemCountryOfOrigin;
    },
  };

  static checkCategory(x) {
    let categories = StoreCategories.getWillysCategories();
    let cat = categories.filter(
      (category) => category.title === x.harvestedFromCategory[0]
    );
    return cat[0].categoryId;
  }

  static checkDiscountPrice(x) {

    try {
      if (x.potentialPromotions[0].conditionLabel.match(/([0-9]+\s)(för)/g)) {
        return x.priceValue;
      }
      return x.potentialPromotions[0].price.value;
    } catch {
      return x.priceValue;
    }
  }

  static checkDiscountComparePrice(x) {

    try {
      if (x.potentialPromotions[0].conditionLabel.match(/([0-9]+\s)(för)/g)) {
        return parseFloat(x.comparePrice.replace(/,/, "."));
      }
      return parseFloat(
        x.potentialPromotions[0].comparePrice.replace(/,/, ".")
      );
    } catch {
      return parseFloat(x.comparePrice.replace(/,/, "."));
    }
  }

  static checkIfDiscount(x) {
    let z =
      x.potentialPromotions.length >= 1
        ? x.potentialPromotions[0].conditionLabel
          ? x.potentialPromotions[0].conditionLabel.match(/([0-9]+\s)(för)/g)
            ? 0
            : 1
          : 0
        : 0;

    return z;
  }
};
