
/*
## Author
Michael V Pratt  [ github.com/mvpratt ] [ Twitter: @mikevpratt ]

TODO:

Major tasks:
  Bitcoin addresses
  Eth contract tie-in
  Make a few slides to show the overall design - block diagram

Code quality:
  script to start postgresql database
  clear up server.js main section
  fix so dont have to pre-populate prices (shows incomplete sql knowledge)
  make a global app scope
  Handle all errors
  react props validation -- check all -- why lint error?
  Check for bad input -- rest api

Frontend:
  Fix favicon error
  Add selector for history range (1day - 90day)  per coin
  Webpack hot module reload
  get latest btc price
  fix savings estimate

Misc:
  Deploy on Heroku
  How to know if db entries are stale -- did requests work> -- disp error
  unit tests --?
  Logging with Morgan js module

Defer:
  scrub css files
  protect postgres user name -- env variable
  Use await?  ES6 features
  Change db name from sample_db
  use import instead of require - ES6 - not supported by node?
  Move latest price data out of database and into front-end (try to use socket for latest)
*/


// myApp = function(){

// ==== DEPENDENCIES ===//

// External
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const express = require('express');

// Local
const webpackConfig = require('./webpack.config.js');
const routes = require('./routes/routes');
const apiPoloniex = require('./api/apiPoloniex');
const apiKraken = require('./api/apiKraken');
const apiBittrex = require('./api/apiBittrex');
const apiCoinCap = require('./api/apiCoinCap');

const refreshCurrentPrices = 3000;

// ==== END DEPENDENCIES ===//

// sends request to url, returns response
const httpGetAsync = function (theUrl, parseResponse, ticker) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function parse() {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      parseResponse(xmlHttp.responseText, ticker);
    }
  };
  xmlHttp.open('GET', theUrl, true); // true for asynchronous
  xmlHttp.send(null);
};

const getCurrentPrice = function (source) {
  switch (source) {
    case 'kraken':
      httpGetAsync(apiKraken.url + apiKraken.tickers.ETH, apiKraken.parseResponse, apiKraken.tickers.ETH);
      httpGetAsync(apiKraken.url + apiKraken.tickers.LTC, apiKraken.parseResponse, apiKraken.tickers.LTC);
      httpGetAsync(apiKraken.url + apiKraken.tickers.DASH, apiKraken.parseResponse, apiKraken.tickers.DASH);
      httpGetAsync(apiKraken.url + apiKraken.tickers.BTC, apiKraken.parseResponse, apiKraken.tickers.BTC);
      break;
    case 'poloniex':
      httpGetAsync(apiPoloniex.url, apiPoloniex.parseResponse, 'all');
      break;
    case 'Bittrex':
      httpGetAsync(apiBittrex.url + apiBittrex.tickers.ETH, apiBittrex.parseResponse, apiBittrex.tickers.ETH);
      httpGetAsync(apiBittrex.url + apiBittrex.tickers.LTC, apiBittrex.parseResponse, apiBittrex.tickers.LTC);
      httpGetAsync(apiBittrex.url + apiBittrex.tickers.DASH, apiBittrex.parseResponse, apiBittrex.tickers.DASH);
      httpGetAsync(apiBittrex.url + apiBittrex.tickers.BTC, apiBittrex.parseResponse, apiBittrex.tickers.BTC);
      break;      
    default:
      console.log('Error');
  }
};

const getAllCurrentPrices = function() {
  getCurrentPrice('kraken');
  getCurrentPrice('poloniex');
  getCurrentPrice('Bittrex');
};

const getPriceHistory = function (ticker) {
  httpGetAsync(apiCoinCap.url + ticker, apiCoinCap.parseResponse, ticker);
};

const timer = function () {
  getAllCurrentPrices();
};

// Main
if (process.env.NODE_ENV === 'dev-server') {
  console.log('Starting dev-server ...');
  // This stands up the webpack-dev-server
  // with Hot Module Reloading enabled.
  // The following is needed in order for
  // Hot Module Reloading to work.

  // webpackConfig.entry.app.unshift('webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server');

  const compiler = webpack(webpackConfig);

  const options = {
    // contentBase: './dist',
    hot: true,
    host: 'localhost',
  };

  WebpackDevServer.addDevServerEntrypoints(webpackConfig, options);

  const server = new WebpackDevServer(compiler, {
    contentBase: './dist',
    hot: true,
    proxy: {
      '/quote': {
        target: 'http://localhost:8081',
        secure: false,
      },
      '/price_history': {
        target: 'http://localhost:8081',
        secure: false,
      },
    },
  });

  server.listen(8080, 'localhost', () => {
    console.log('dev server listening on port 8080');
  });

  getAllCurrentPrices();
  getPriceHistory('BTC');
  getPriceHistory('ETH');
  getPriceHistory('LTC');
  getPriceHistory('DASH');

  let intervalId = setInterval(timer, refreshCurrentPrices);  
} 
else if (process.env.NODE_ENV === 'dev-api') {
  console.log('Starting dev-api ...');
  // This stands up the express.js API
  const app = express();

  // We define the API routes here
  routes.defineApi(app);

  app.listen(8081, () => {
    console.log('API is up!');
  });
} 
else { // todo - not tested
  console.log('Starting PROD ...');
  // = PROD =
  // This is here for simplicity's sake,
  // in a real-world application none of
  // the development code should be copied
  // over to the production server.
  const app = express();

  // We serve the bundle folder, which
  // should contain an `index.html` and
  // a `bundle.js` file only.
  app.use('/', express.static('bundle'));

  // We define the API routes here
  routes.defineApi(app);

  app.listen(8080, () => {
    console.log('Both PROD front-end and API are up!');
  });
}
// End main
// }

