const db = require('./db');

const datetime = new Date(Date.now());
const defaultPrice = 0.42;

db.clearTable();

db.supportedCoins.forEach(function initPrice(coin)  {
  db.insertPrice(coin, 'Kraken', datetime, defaultPrice);
  db.insertPrice(coin, 'Poloniex', datetime, defaultPrice);      
  db.insertPrice(coin, 'Coincap', datetime, defaultPrice);
  db.insertPrice(coin, 'Bittrex', datetime, defaultPrice); 
});
