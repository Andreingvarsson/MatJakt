const express = require("express");
const app = express();
const Harvester = require("./classes/Harvesters/Harvester");
const DbHandler = require("./classes/DBHandler");
const util = require("util");
const db = new DbHandler("./database/MatJaktDatabase.db");
const APIHandler = require("./classes/APIHandler");
const api = new APIHandler("./classes/APIHandler");


app.get("/api/categories", api.categories);


app.get("/api/catProducts/:categoryId", api.categoryProducts);

app.get("/api/searchProducts/:searchWord", api.searchedProducts);


app.use(express.static(__dirname + "src")); 

app.get("*", (req, res) => {
  res.sendFile("index.js", { root: "src" });
});

app.listen(3001, () => console.log("MatJakt server listening on port 3001"));
