const db = require('../db/db');

const tickers = {
  BTC: 'USDT_BTC',
  ETH: 'BTC_ETH',
  LTC: 'BTC_LTC',
  DASH: 'BTC_DASH',
};

const url = 'https://poloniex.com/public?command=returnTicker';

module.exports = {
  url,
  tickers,

  parseResponse: (value, ticker) => { // doesnt use ticker argument
    const obj = JSON.parse(value);
    const datetime = new Date(Date.now());
    db.updatePrice('ETH', 'Poloniex', datetime, obj.BTC_ETH.last);
    db.updatePrice('LTC', 'Poloniex', datetime, obj.BTC_LTC.last);
    db.updatePrice('DASH', 'Poloniex', datetime, obj.BTC_DASH.last);
    db.updatePrice('BTC', 'Poloniex', datetime, obj.USDT_BTC.last);    
  },
};
