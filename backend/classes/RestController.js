const sqlite = require('better-sqlite3')

module.exports = class restController {

    constructor(pathToDatabase) {
        this.connection = sqlite(pathToDatabase);
      }


      insertMany(tableName, data) {

        // assume all objects have the same properties
        let properties = Object.keys(data[0]);

        let statement = this.connection.prepare(`
        INSERT INTO ${tableName} (${properties.join(', ')}) 
        VALUES (${properties.map(x => '@' + x).join(', ')})
      `);
    }

    
}