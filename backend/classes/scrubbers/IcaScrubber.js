const fetch = require("node-fetch");
const Scrubber = require("./Scrubber");
//const icaCategories = require("./StoreCategories")
module.exports = class IcaScrubber extends Scrubber {
  static translateSchemaIca = {
    storeId: (x) => (x.storeId = 2),
    categoryId: (x) => this.checkCategory(x),
    name: (x) => x.name ? x.name : 'Unknown',
    brand: (x) => x.brand ? x.brand : 'Unknown',
    imageUrl: (x) => x.cloudinaryImageId? x.cloudinaryImageId : 'Unknown',
    price: (x) => x.price? x.price : null,
    productVolumeUnit: (x) => {
      if (x.soldInUnit === "kgm") {
        return "g";
      } else if (x.soldInUnit === "pce") {
        return "st";
      }
    },
    productVolume: (x) => x.unitWeight ? x.unitWeight : null,
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
    originCountry: (x) => (x.countryOfOrigin ? x.countryOfOrigin.name : null),
  };

  static checkCategory(x) {

    // beroende på vår entitet category i vår DB tilldelas de en kategori som vi bestämmer.
    let categories = [
      { title: "Kött, fågel & fisk", categoryId: 1 },
      { title: "Vegetariskt", categoryId: 3 },
      { title: "Mejeri, ost & ägg", categoryId: 2 },
      { title: "Frukt & grönt", categoryId: 2 },
      { title: "Bröd & kakor", categoryId: 2 },
      { title: "Fryst", categoryId: 5 },
      { title: "Skafferi", categoryId: 6 },
      { title: "Färdigmat", categoryId: 7 },
      { title: "Dryck", categoryId: 8 },
      { title: "Glass, godis & snacks", categoryId: 9 },
      { title: "Barn", categoryId: 10 },
      { title: "Städ & disk", categoryId: 11 },
      { title: "Hälsa & skönhet", categoryId: 12 },
      { title: "Receptfria läkemedel", categoryId: 13 },
      { title: "Djur", categoryId: 14 },
      { title: "Kök", categoryId: 15 },
      { title: "Hem & fritid", categoryId: 16 },
      { title: "Kiosk", categoryId: 17 },
    ];

    let cat = categories.filter(
      (category) => category.title === x.harvestedFromCategory[0]
    );
    return cat[0].categoryId;
  }
};
