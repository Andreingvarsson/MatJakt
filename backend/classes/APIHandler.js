const DbHandler = require("./DBHandler");
const db = new DbHandler("./database/MatJaktDatabase.db");

module.exports = class APIHandler {

  categoryProducts(req, res) {
  const limit = req.query.limit ? ` LIMIT ` + req.query.limit : "";
  const page = req.query.page ? ` OFFSET ` + req.query.page * 10 : "";
  const eco = req.query.eco;
  const swe = req.query.swe;
  if(eco === 'true' && swe === 'true'){
    let products = db.all(
      "SELECT * FROM products WHERE categoryId = " +req.params.categoryId +" AND products.eco = 1 AND products.Swedish = 1 ORDER BY price ASC " + limit + page
      )
      return res.json(products)
  }else if(eco === 'true'){
    let products = db.all(
    "SELECT * FROM products WHERE categoryId = " +req.params.categoryId +" AND products.eco = 1 ORDER BY price ASC " + limit + page
    )
    return res.json(products)
  }else if(swe === 'true'){
    let products = db.all(
    "SELECT * FROM products WHERE categoryId = " +req.params.categoryId +" AND products.Swedish = 1 ORDER BY price ASC " + limit + page
    )
    return res.json(products)
  }
  let anyProducts = db.all(
    "SELECT * FROM products WHERE categoryId = " +req.params.categoryId +" ORDER BY price ASC " + limit + page
  );
  return res.json(anyProducts);
};

  searchedProducts(req, res) {
   const limit = req.query.limit ? ` LIMIT ` + req.query.limit : "";
  const page = req.query.page ? ` OFFSET ` + req.query.page * 10 : "";
  const eco = req.query.eco;
  const swe = req.query.swe;
  if(eco === 'true' && swe === 'true'){
    let products = db.all(
      "SELECT categories.name, products.* FROM products, categories WHERE products.categoryId = categories.categoryId AND products.name LIKE "+"'"+"%"+req.params.searchWord+"%"+"'"+" AND products.eco = 1 AND products.Swedish = 1 ORDER BY  INSTR("+"'"+"Fryst, Skafferi Djur"+"'"+", categories.name), length(products.name) ASC" + limit + page
    )
    return res.json(products)
  }else if(eco === 'true'){
    let ecoProducts = db.all(
    "SELECT categories.name, products.* FROM products, categories WHERE products.categoryId = categories.categoryId AND products.name LIKE "+"'"+"%"+req.params.searchWord+"%"+"'"+" AND products.eco = 1 ORDER BY  INSTR("+"'"+"Fryst, Skafferi Djur"+"'"+", categories.name), length(products.name) ASC" + limit + page
    )
    return res.json(ecoProducts)

  }else if(swe === 'true'){
    let swedishProducts = db.all(
      "SELECT categories.name, products.* FROM products, categories WHERE products.categoryId = categories.categoryId AND products.name LIKE "+"'"+"%"+req.params.searchWord+"%"+"'"+" AND products.Swedish = 1 ORDER BY  INSTR("+"'"+"Fryst, Skafferi Djur"+"'"+", categories.name), length(products.name) ASC" + limit + page
      )
     return res.json(swedishProducts);
  }
  let anyProducts = db.all(
    "SELECT categories.name,  products.* FROM products, categories WHERE products.categoryId = categories.categoryId AND products.name LIKE "+"'"+"%"+req.params.searchWord+"%"+"'"+" ORDER BY  INSTR("+"'"+"Fryst, Skafferi Djur"+"'"+", categories.name), length(products.name) ASC" + limit + page
  );
  return res.json(anyProducts);
};

  categories(req, res) {
      let anyCategories = db.all("SELECT * FROM categories ");
      res.json({
        anyCategories,
      });
  }
}