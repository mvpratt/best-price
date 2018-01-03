const db = require('../db/db');

module.exports = {

  handler: (err, data, res) => {
    if (err) {
      console.log(`db error:${err}`);
      return err;
    }
    res.json(data.rows);
  },

  // todo - move to db module
  // todo - check for valid coin and valid source
  // todo - change name of getpricehistory
  // note - db invalid queries fail silently

  getQuote: (coin, sources, res) => {
    const text = 'SELECT * FROM prices \
                  WHERE coin = $1 AND source = $2 \
                  OR coin = $1 AND source = $3 \
                  OR coin = $1 and source = $4 \
                  ORDER BY source';
    const values = [coin].concat(sources);

    db.query(text, values, (err, data) => {
      module.exports.handler(err, data, res);
    });
  },

  getPriceHistory: (coin, source, res) => {
    const text = 'SELECT * FROM prices WHERE coin = $1 AND source = $2 ORDER BY tstamp';
    const values = [coin, source];

    db.query(text, values, (err, data) => {
      module.exports.handler(err, data, res);
    });
  },

  defineApi: (app) => {
    app.get('/quote/:quoteId', (req, res) => {
      module.exports.getQuote(req.params.quoteId, db.quoteSources, res);
    });

    app.get('/price_history/:priceId', (req, res) => {
      module.exports.getPriceHistory(req.params.priceId, db.priceHistorySource, res);
    });
  },
};
