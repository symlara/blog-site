// import sequalize 
const Sequalize = require('sequelize');

require('dotenv').config();

let sequalize;

if (process.env.JAWSDB_URL) {
    sequalize = new Sequalize(process.env.JAWSDB_URL);
}else {
    // connect to database
    sequalize = new Sequalize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}

module.exports = sequalize;