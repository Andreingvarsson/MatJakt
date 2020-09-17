const fetch = require('node-fetch');

module.exports = class MatHemHarvester {

  static async getProducts(categoryURL) {
    let raw = await fetch(
      "https://api.mathem.io/product-search/noauth/search/products/10/categorytag/" 
      + categoryURL + 
      "?size=10000&storeId=10&searchType=category&sortTerm=popular&sortOrder=desc" 
    );
        let fetchedProducts = await raw.json();
        let products = fetchedProducts.products;
    return products;
  }

  static async getCategories() {
    let raw = await fetch(
      "https://api.mathem.io/ecom-navigation/noauth/v2/menu/10?level=1"
    );

    // let fetchedProducts = await raw.json();
    // let products = await fetchedProducts.categories.map(x => x.id);
    // return products; 
    return (await raw.json());
  }
};