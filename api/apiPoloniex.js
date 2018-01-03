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
    db.updatePrice('ETH', 'poloniex', datetime, obj.BTC_ETH.last);
    db.updatePrice('LTC', 'poloniex', datetime, obj.BTC_LTC.last);
    db.updatePrice('DASH', 'poloniex', datetime, obj.BTC_DASH.last);
    db.updatePrice('BTC', 'poloniex', datetime, obj.USDT_BTC.last);    
  },
};
