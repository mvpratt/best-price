const { Pool } = require('pg');
const dbConfig = require('./dbConfig');

const pool = new Pool(dbConfig.config);

const supportedCoins = ['ETH', 'LTC', 'DASH', 'BTC'];
const supportedExchanges = ['kraken', 'coinbase', 'poloniex', 'Bittrex'];
const quoteSources = ['poloniex', 'kraken', 'Bittrex'];
const priceHistorySource = 'coincap';
const validCoins = ['ETH', 'LTC', 'DASH', 'BTC'];

module.exports = {

  supportedCoins,
  supportedExchanges,
  quoteSources,
  priceHistorySource,
  validCoins,

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


/*
  getPriceHistory: (coin, source) => {
    const text = 'SELECT * FROM prices WHERE coin = $1 AND source = $2 ORDER BY tstamp';
    const values = [coin, source];
    return module.exports.query(text, values);
  },

  getQuote: (coin, sources) => {
    const text = 'SELECT * FROM prices WHERE coin = $1 AND source = $2 OR coin = $1 AND source = $3 ORDER BY tstamp';
    const values = [coin].concat(sources);
    return module.exports.query(text, values);
  }   */
};
