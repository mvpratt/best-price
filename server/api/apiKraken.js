const db = require('../db/db');

const tickers = {
    BTC: 'XBTUSD',
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

        //if (obj.error ){
        //    console.log('Error: Kraken parseResponse(): property .success is false');
        //    console.log(obj);
        //}
        /*else */if( ('result' in obj) !== true || obj.result === undefined || obj.result === null ) {
            console.log('Error: Kraken parseResponse(): property .result is undefined');
            console.log(obj);
        }
        else {
        switch (ticker) {
        case module.exports.tickers.ETH:
            db.updatePrice('ETH', 'Kraken', datetime, obj.result.XETHXXBT.c[0]);
            break;
        case module.exports.tickers.LTC:
            db.updatePrice('LTC', 'Kraken', datetime, obj.result.XLTCXXBT.c[0]);
            break;
        case module.exports.tickers.DASH:
            db.updatePrice('DASH', 'Kraken', datetime, obj.result.DASHXBT.c[0]);
            break;
        case module.exports.tickers.BTC:
            db.updatePrice('BTC', 'Kraken', datetime, obj.result.XXBTZUSD.c[0]);  /// todo - double check coin ticker
            break;        
        default:
                console.log('Error: Kraken parseResponse(): Unsupported coin ticker');
        }
        }
    },
};
