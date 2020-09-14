const fetch = require("node-fetch");

module.exports = class IcaHarvester {

  static async getProductIds(categoryURL) {
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
    //***** Suuposed to remove the commercial ad */
    // let ids = productIds.filter(function(x){
    //   return x.length === 13;
    // })
    while(productIds.length > 0 ){
      idsToFetch.push(productIds.splice(0, 99));
    }

    for(let i=0; i< idsToFetch.length; i++){

      let raw = await fetch(
        "https://handla.ica.se/api/content/v1/collection/customer-type/B2C/store/maxi-ica-stormarknad-malmo-id_02748/products-data?skus=" +
          idsToFetch[i].toString()
      );
      let res = await raw.json();
      fetchedItems = [...fetchedItems,...res ];
    }
    return fetchedItems;
  }
  
  static async getCategories() {
    let raw = await fetch(
      "https://handla.ica.se/api/product-info/v1/store/11981/category/catalog80002"
    );
    // let categoryObj = await raw.json();
    // let categories = categoryObj.childCategories.map(x => x.seoUrl)

    return (await raw.json());
  }

};