const db = require('./db');

const datetime = new Date(Date.now());
const defaultPrice = 0.42;

db.clearTable();

db.insertPrice('ETH', 'kraken', datetime, defaultPrice);
db.insertPrice('LTC', 'kraken', datetime, defaultPrice);
db.insertPrice('DASH', 'kraken', datetime, defaultPrice);
db.insertPrice('BTC', 'kraken', datetime, defaultPrice);

db.insertPrice('ETH', 'poloniex', datetime, defaultPrice);
db.insertPrice('LTC', 'poloniex', datetime, defaultPrice);
db.insertPrice('DASH', 'poloniex', datetime, defaultPrice);
db.insertPrice('BTC', 'poloniex', datetime, defaultPrice);

db.insertPrice('ETH', 'coincap', datetime, defaultPrice);
db.insertPrice('LTC', 'coincap', datetime, defaultPrice);
db.insertPrice('DASH', 'coincap', datetime, defaultPrice);
db.insertPrice('BTC', 'coincap', datetime, defaultPrice);

db.insertPrice('ETH', 'Bittrex', datetime, defaultPrice);
db.insertPrice('LTC', 'Bittrex', datetime, defaultPrice);
db.insertPrice('DASH', 'Bittrex', datetime, defaultPrice);
db.insertPrice('BTC', 'Bittrex', datetime, defaultPrice);