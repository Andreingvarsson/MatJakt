const DbHandler = require("./DBHandler");
const db = new DbHandler("./database/MatJaktDatabase.db");

module.exports = class APIHandler {

  categoryProducts(req, res) {
    const limit = req.query.limit ? ` LIMIT ` + req.query.limit : "";
    const page = req.query.page ? ` OFFSET ` + req.query.page * 10 : "";
    console.log(req.query.limit + " req limit" + req.query.page);
    let anyProducts = db.all(
      "SELECT * FROM products WHERE categoryId = " +
      req.params.categoryId +
      " ORDER BY price ASC " +
      limit +
      page
    );
    res.json(anyProducts);
  }

  searchedProducts(req, res) {
    const limit = req.query.limit ? ` LIMIT ` + req.query.limit : "";
    const page = req.query.page ? ` OFFSET ` + req.query.page * 10 : "";
    console.log(req.query.limit + " req limit" + req.query.page + 'INNNNNEEE I BACK');
    let anyProducts = db.all(
      "SELECT * FROM products WHERE name LIKE " + "'" + "%" + req.params.searchWord + "%" + "'" + " ORDER BY price ASC " + limit + page
    );
    res.json(anyProducts);
  }

  categories(req, res) {
      let anyCategories = db.all("SELECT * FROM categories ");
      res.json({
        anyCategories,
      });
  }
}