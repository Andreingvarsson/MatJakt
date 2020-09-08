const fetch = require('node-fetch');

module.exports = class MatHemHarvester {


  static async getMatHemProducts(categoryURL) {
    let raw = await fetch(
      "https://api.mathem.io/product-search/noauth/search/products/10/categorytag/" 
      + categoryURL + 
      "?size=10000&storeId=10&searchType=category&sortTerm=popular&sortOrder=desc" 
    );
        let fetchedProducts = await raw.json();
        let mappedProducts = fetchedProducts.products;
        //console.log(mappedProducts[0])

    return mappedProducts;
  }

  static async getMatHemCategories() {
    let raw = await fetch(
      "https://api.mathem.io/ecom-navigation/noauth/v2/menu/10?level=1"
    );

    let newArray = await raw.json();
    let mappedArray = await newArray.categories.map(x => x.id);
    return mappedArray; 
  }
};