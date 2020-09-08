const fetch = require('node-fetch');
const cheerio = require('cheerio');

// Coop codes å,ä,ä,& etc using special html encoding
// this library converts to utf-8/normal encoding...
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

module.exports = class CoopHarvester {

  static genericCoopAPIUrl = 'https://www.coop.se/ws/v2/coop/users/anonymous/' +
    'products/discover?categoryId=XXX&storeId=016001' +
    '&placements=category_page.Discover&rrSessionId=1' +
    '&currentPage=0&pageSize=10000&fields=FULL';

  static async getCategories() {
    // coop hard codes the categories in the html source
    let raw = await fetch('https://www.coop.se/handla/');
    let html = await raw.text();
    let $ = cheerio.load(html);
    let categories = [];
    $('.nav-container > ul').last().find('.nav-node-name').each((i, x) => {
      categories.push({
        name: entities.decode($(x).html()),
        url: this.genericCoopAPIUrl.replace(/XXX/, $(x).parent().attr('data-code')),
        level: $(x).parents('ul').length
      });
    });
    return categories.filter(x => x.level === 1);
  }

}