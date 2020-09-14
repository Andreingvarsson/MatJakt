const fetch = require("node-fetch");
const Scrubber = require("./Scrubber");

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
    Swedish: (x) => x.origin ? x.origin === "Sverige" ? x.origin : null : null,
    originCountry: (x) => (x.origin || {}).name || "Unknown",
  };

  static checkCategory(x) {
    // beroende på vår entitet category i vår DB tilldelas de en kategori som vi bestämmer.
    let categories = [
      { title: "Frukt & Grönt", categoryId: 1 },
      { title: "Mejeri & Ost", categoryId: 3 },
      { title: "Bröd & Bageri", categoryId: 2 },
      { title: "Kött & Chark", categoryId: 2 },
      { title: "Dryck", categoryId: 2 },
      { title: "Skafferi", categoryId: 5 },
      { title: "Fisk & Skaldjur", categoryId: 6 },
      { title: "Hem & Hushåll", categoryId: 7 },
      { title: "Färdigmat & Mellanmål", categoryId: 8 },
      { title: "Glass Godis & Snacks", categoryId: 9 },
      { title: "Barnmat & Tillbehör", categoryId: 10 },
      { title: "Apotek, Hygien & Hälsa", categoryId: 11 },
      { title: "Kryddor & Smaksättare", categoryId: 12 },
      { title: "Djurmat & Tillbehör", categoryId: 13 },
      { title: "Kiosk & Tidningar", categoryId: 14 },
    ];

    let cat = categories.filter(
      (category) => category.title === x.harvestedFromCategory[0]
    );
    return cat[0].categoryId;
  }
};
