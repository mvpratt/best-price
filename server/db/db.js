const { Pool } = require('pg');
const dbConfig = require('./dbConfig');

// heroku
//const connectionString = 'postgres://qeztuavgdyfmbm:50b0963fd388698301a20314deba8998e4df29b1e732f742cc945c830ea2b2a7@ec2-54-227-250-33.compute-1.amazonaws.com:5432/d2ggtns0cukb42'
//const pool = new Pool({ connectionString: connectionString });

// local db
const pool = new Pool(dbConfig.config);

const supportedCoins = ['ETH', 'LTC', 'DASH', 'BTC'];
const quoteSources = ['Poloniex', 'Kraken', 'Bittrex'];
const priceHistorySource = 'Coincap';

module.exports = {

    supportedCoins,
    quoteSources,
    priceHistorySource,

    query: (text, params, callback) => pool.query(text, params, callback),

    handler: (err) => {
        if (err) {
            console.log(`db error:${err}`);
        }
    },

    deletePrice: (coin, source) => {
        const text = 'DELETE FROM prices WHERE source = $1 AND coin = $2';
        const values = [source, coin];

        module.exports.query(text, values, (err, data) => {
            module.exports.handler(err, data);
        });
    },

    updatePrice: (coin, source, tstamp, quote) => {
        const text = 'UPDATE prices SET tstamp = $1, quote = $2 WHERE source = $3 AND coin = $4';
        const values = [tstamp, quote, source, coin];

        module.exports.query(text, values, (err, data) => {
            module.exports.handler(err, data);
        });
    },

    insertPrice: (coin, source, tstamp, quote) => {
        const text = 'INSERT INTO prices (source, tstamp, quote, coin) VALUES ($1, $2, $3, $4)';
        const values = [source, tstamp, quote, coin];

        module.exports.query(text, values, (err) => {
            module.exports.handler(err);
        });
    },

    clearTable: () => {
        const text = 'DELETE FROM prices';
        const values = [];

        module.exports.query(text, values, (err) => {
            module.exports.handler(err);
        });
    },
};
