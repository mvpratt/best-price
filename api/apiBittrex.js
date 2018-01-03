const db = require('../db/db');

const tickers = {
  BTC: 'USDT-BTC',
  ETH: 'BTC-ETH',
  LTC: 'BTC-LTC',
  DASH: 'BTC-DASH',
};

const url = 'https://bittrex.com/api/v1.1/public/getticker/?market=';

module.exports = {
  url,
  tickers,

  parseResponse: (value, ticker) => { 
    const obj = JSON.parse(value);
    const datetime = new Date(Date.now());

    switch (ticker) {
      case module.exports.tickers.ETH:
        db.updatePrice('ETH', 'Bittrex', datetime, obj.result.Last);
        break;
      case module.exports.tickers.LTC:
        db.updatePrice('LTC', 'Bittrex', datetime, obj.result.Last);
        break;
      case module.exports.tickers.DASH:
        db.updatePrice('DASH', 'Bittrex', datetime, obj.result.Last);
        break;
      case module.exports.tickers.BTC:
        db.updatePrice('BTC', 'Bittrex', datetime, obj.result.Last);
        break;        
      default:
        console.log('Error');
    }
  },
};
