const fetch = require("node-fetch");

module.exports = class IcaHarvester {

  static async getProductIds(categoryURL) {
    console.log(categoryURL)
    let raw = await fetch(
      'https://handla.ica.se/api/content/v1/collections/facets/customer-type/B2C/store/maxi-ica-stormarknad-malmo-id_02748/products?categories=' +
        categoryURL + "&bb=true");
    return (await raw.json());
  }

  static async getProducts(categoryURL) {
    
    let idsToFetch = [];
    let fetchedItems = [];

    let products = await this.getProductIds(categoryURL);
    let productIds = products.items.map(x=> x.id);
    let ids = productIds.filter(function(x){
      return x.length === 13;
    })

    while(ids.length > 0 ){
      //Supposed to fetch 99 items a time
      idsToFetch.push(ids.splice(0, 10));
    }

    for(let i=0; i< idsToFetch.length; i++){

      console.log(idsToFetch[i].toString());
      let raw = await fetch(
        "https://handla.ica.se/api/content/v1/collection/customer-type/B2C/store/maxi-ica-stormarknad-malmo-id_02748/products-data?skus=" +
          idsToFetch[i].toString()
      );
      fetchedItems.push(await raw.json());
    }
    return fetchedItems;
  }
  

  static async getCategories() {
    let raw = await fetch(
      "https://handla.ica.se/api/product-info/v1/store/11981/category/catalog80002"
    );
    return (await raw.json()).results;
  }

};