let dbCategories = {
  kottFagelFisk: 1,
  fruktOchGront: 2,
  fryst: 3,
  vegetariskt: 4,
  mejeriOstAgg: 5,
  brodOchKakor: 6,
  dryck: 7,
  glassGodisSnacks: 8,
  barn: 9,
  hemOchHushall: 10,
  halsaOchSkonhet: 11,
  apotek: 12,
  djur: 13,
  kiosk: 14,
  skafferi: 15,
  fardigmat: 16,
}
module.exports = class StoreCategories {

      static getWillysCategories(){
        let willysCategories = [
          { title: "Kött, chark & fågel", categoryId: dbCategories.kottFagelFisk },
          { title: "Fryst", categoryId: dbCategories.fryst},
          { title: "Skafferi", categoryId: dbCategories.skafferi},
          { title: "Hem & Städ", categoryId: dbCategories.hemOchHushall},
          { title: "Mejeri, ost & ägg", categoryId: dbCategories.mejeriOstAgg },
          { title: "Frukt & Grönt", categoryId: dbCategories.fruktOchGront },
          { title: "Bröd & Kakor", categoryId: dbCategories.brodOchKakor },
          { title: "Fisk & Skaldjur", categoryId: dbCategories.kottFagelFisk },
          { title: "Dryck", categoryId: dbCategories.dryck},
          { title: "Vegetariskt", categoryId: dbCategories.vegetariskt },
          { title: "Glass, godis & snacks", categoryId: dbCategories.glassGodisSnacks },
          { title: "Färdigmat", categoryId: dbCategories.fardigmat },
          { title: "Barn", categoryId: dbCategories.barn },
          { title: "Blommor", categoryId: dbCategories.hemOchHushall },
          { title: "Hälsa & Skönhet", categoryId: dbCategories.halsaOchSkonhet },
          { title: "Apotek", categoryId: dbCategories.apotek },
          { title: "Trädgård", categoryId: dbCategories.hemOchHushall },
          { title: "Husdjur", categoryId: dbCategories.djur },
          { title: "Tobak", categoryId: dbCategories.kiosk },
          { title: "Tändare & tobakstillbehör", categoryId: dbCategories.kiosk },
          { title: "Lotter", categoryId: dbCategories.kiosk },
          { title: "Tidningar & böcker", categoryId: dbCategories.kiosk },
        ];
        return willysCategories;
      }
      static getIcaCategories(){
        let icaCategories = [
          { title: "Kött, fågel & fisk", categoryId: dbCategories.kottFagelFisk},
          { title: "Vegetariskt", categoryId: dbCategories.vegetariskt},
          { title: "Mejeri, ost & ägg", categoryId: dbCategories.mejeriOstAgg },
          { title: "Frukt & grönt", categoryId: dbCategories.fruktOchGront },
          { title: "Bröd & kakor", categoryId: dbCategories.brodOchKakor },
          { title: "Fryst", categoryId: dbCategories.fryst },
          { title: "Skafferi", categoryId: dbCategories.skafferi },
          { title: "Färdigmat", categoryId: dbCategories.fardigmat },
          { title: "Dryck", categoryId: dbCategories.dryck },
          { title: "Glass, godis & snacks", categoryId: dbCategories.glassGodisSnacks },
          { title: "Barn", categoryId: dbCategories.barn },
          { title: "Städ & disk", categoryId: dbCategories.hemOchHushall },
          { title: "Hälsa & skönhet", categoryId: dbCategories.halsaOchSkonhet },
          { title: "Receptfria läkemedel", categoryId: dbCategories.apotek },
          { title: "Djur", categoryId: dbCategories.djur },
          { title: "Kök", categoryId: dbCategories.hemOchHushall },
          { title: "Hem & fritid", categoryId: dbCategories.hemOchHushall },
          { title: "Kiosk", categoryId: dbCategories.kiosk },
        ]
        return icaCategories;
      }
      static getMatHemCategories(){
        let mathemCategories = [
          { title: "Frukt & Grönt", categoryId: dbCategories.fruktOchGront },
          { title: "Mejeri & Ost", categoryId: dbCategories.mejeriOstAgg },
          { title: "Bröd & Bageri", categoryId: dbCategories.brodOchKakor },
          { title: "Kött & Chark", categoryId: dbCategories.kottFagelFisk },
          { title: "Dryck", categoryId: dbCategories.dryck },
          { title: "Skafferi", categoryId: dbCategories.skafferi },
          { title: "Fisk & Skaldjur", categoryId: dbCategories.kottFagelFisk },
          { title: "Hem & Hushåll", categoryId: dbCategories.hemOchHushall },
          { title: "Färdigmat & Mellanmål", categoryId: dbCategories.fardigmat },
          { title: "Glass Godis & Snacks", categoryId: dbCategories.glassGodisSnacks },
          { title: "Barnmat & Tillbehör", categoryId: dbCategories.barn },
          { title: "Apotek, Hygien & Hälsa", categoryId: dbCategories.halsaOchSkonhet },
          { title: "Kryddor & Smaksättare", categoryId: dbCategories.skafferi },
          { title: "Djurmat & Tillbehör", categoryId: dbCategories.djur },
        { title: "Kiosk & Tidningar", categoryId: dbCategories.kiosk },
      ];
      return mathemCategories;
    }
  }
