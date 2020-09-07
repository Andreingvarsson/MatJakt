// const WillysSchema = require("./WillysScrubber")
module.exports = class Scrubber {

  static async scrubOneIca(product) {
    let scrubbed = {};
    let tschema = this.translateSchemaIca;
    for (let key in tschema) {
      let scrubFunc = tschema[key];
      scrubbed[key] = await scrubFunc(product);
    }
    return scrubbed;
  }

  static async scrubOneWillys(product) {
    let scrubbed = {};
    let tschema = this.translateSchemaWillys;
    for (let key in tschema) {
      let scrubFunc = tschema[key];
      scrubbed[key] = await scrubFunc(product);
    }
    return scrubbed;
  }

  static async scrubOneCoop(product) {
    let scrubbed = {};
    let tschema = this.translateSchemaCoop;
    for (let key in tschema) {
      let scrubFunc = tschema[key];
      scrubbed[key] = await scrubFunc(product);
    }
    return scrubbed;
  }

  static async scrubAllWillysProducts(products) {
    let scrubbed = [];
    for (let product of products) {
      scrubbed.push(await this.scrubOneWillys(product));
    }
    return scrubbed;
  }
  static async scrubAllIcaProducts(products) {
    let scrubbed = [];
    for (let product of products) {
      scrubbed.push(await this.scrubOneIca(product));
    }
    return scrubbed;
  }
};
