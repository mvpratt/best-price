const db = require('../db/db');

const tickers = {
  ETH: 'XETHXXBT',
  LTC: 'XLTCXXBT',
  DASH: 'DASHXBT',
};

const url = 'https://api.kraken.com/0/public/Ticker?pair=';

module.exports = {
  url,
  tickers,

  parseResponse: (value, ticker) => {
    const obj = JSON.parse(value);
    const datetime = new Date(Date.now());

    switch (ticker) {
      case module.exports.tickers.ETH:
        db.updatePrice('ETH', 'kraken', datetime, obj.result.XETHXXBT.c[0]);
        break;
      case module.exports.tickers.LTC:
        db.updatePrice('LTC', 'kraken', datetime, obj.result.XLTCXXBT.c[0]);
        break;
      case module.exports.tickers.DASH:
        db.updatePrice('DASH', 'kraken', datetime, obj.result.DASHXBT.c[0]);
        break;
      default:
        console.log('Error');
    }
  },
};
