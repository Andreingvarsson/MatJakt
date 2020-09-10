const fetch = require("node-fetch");
const Scrubber = require("./Scrubber");
const willysCategories = require("./StoreCategories")

module.exports = class WillysScrubber extends Scrubber {

  static translateSchemaWillys = {
    storeId: (x) => x.storeId = 1,
    categoryId: (x) => this.checkCategory(x), 
    name: (x) => x.name? x.name: 'Unknown',
    brand: (x) => x.manufacturer? x.manufacturer: 'Unknown',
    imageUrl: (x) => x.image && x.image.url ? x.image && x.image.url: 'Unknown',
    price: (x) => x.priceValue? x.priceValue : 'Unknown' ,
    productVolumeUnit: (x) => x.displayVolume.replace(/[0-9\.]|ca: /g, ""),
    productVolume: (x) => parseFloat(x.displayVolume.replace(/,/, ".").replace(/ca: /, "")),
    comparePrice: (x) => parseFloat(x.comparePrice.replace(/,/, ".")),
    compareUnit: (x) => x.comparePriceUnit? x.comparePriceUnit: 'Unknown' ,
    eco: (x) => x.labels.includes("ecological"),
    Swedish: (x) => x.labels.includes("swedish_flag"),
    // NodeFetch ERROR Unexpected token N in json at position 0 ?
     originCountry: (x)=> '',
     //async (x) => {
    //   // Seems we need detailed product info for this...
    //   // (one fetch per product - lots of extra time :( )
    //   // maybe ask productOwner if Swedish/non Swedish enough?
    //   let rawData = await fetch(
    //     "https://www.willys.se/axfood/rest/p/" + x.code
    //   );
    //   let data = await rawData.json();
    //   return data.originCountry || data.tradeItemCountryOfOrigin;
    // },
  };

  static checkCategory(x){

    // beroende på vår entitet category i vår DB tilldelas de en kategori som vi bestämmer.
    let categories = [
      { title: "Kött, chark & fågel", categoryId: 1 },
      { title: "Fryst", categoryId: 3 },
      { title: "Skafferi", categoryId: 2 },
      { title: "Hem & Städ", categoryId: 2 },
      { title: "Mejeri, ost & ägg", categoryId: 2 },
      { title: "Frukt & Grönt", categoryId: 5 },
      { title: "Bröd & Kakor", categoryId: 6 },
      { title: "Fisk & Skaldjur", categoryId: 7 },
      { title: "Dryck", categoryId: 8 },
      { title: "Vegetariskt", categoryId: 9 },
      { title: "Glass, godis & snacks", categoryId: 10 },
      { title: "Färdigmat", categoryId: 11 },
      { title: "Barn", categoryId: 12 },
      { title: "Blommor", categoryId: 13 },
      { title: "Hälsa & Skönhet", categoryId: 14 },
      { title: "Apotek", categoryId: 15 },
      { title: "Trädgård", categoryId: 16 },
      { title: "Husdjur", categoryId: 17 },
      { title: "Tobak", categoryId: 18 },
      { title: "Tändare & tobakstillbehör", categoryId: 19 },
      { title: "Lotter", categoryId: 20 },
      { title: "Tidningar & böcker", categoryId: 21 },
    ];
     
    let cat = categories.filter(category => category.title === x.harvestedFromCategory[0])
    return cat[0].categoryId;
  }
 
};
