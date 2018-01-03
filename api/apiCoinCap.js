const db = require('../db/db');

const tickers = {
  ETH: 'ETH',
  LTC: 'LTC',
  DASH: 'DASH',
};

const url = 'http://coincap.io/history/30day/';

module.exports = {
  url,
  tickers,

  parseResponse: (value, ticker) => {
    const obj = JSON.parse(value);
    db.deletePrice(ticker, 'coincap'); // remove old price history

    for (let i = 0; i < obj.price.length; i += 1) {
      const datetime = new Date(obj.price[i][0]);
      db.insertPrice(ticker, 'coincap', datetime, obj.price[i][1]); // insert new price history
    }
  },
};
