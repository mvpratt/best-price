
/*
 * Author
 * Michael V Pratt  [ github.com/mvpratt ] [ Twitter: @mikevpratt ]
 */

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
// ==== END DEPENDENCIES ===//

const refreshCurrentPrices = 3000;

//handle
//empty json object
//error 404
//timeout



// sends request to url, returns response
const httpGetAsync = function (theUrl, parseResponse, ticker) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function parse() {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      // check for errors
      // debug
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

const getAllPriceData = function() {
  getCurrentPrice('kraken');
  getCurrentPrice('poloniex');
  getCurrentPrice('Bittrex');

  getPriceHistory('BTC');
  getPriceHistory('ETH');
  getPriceHistory('LTC');
  getPriceHistory('DASH');  
};

const getPriceHistory = function (ticker) {
  httpGetAsync(apiCoinCap.url + ticker, apiCoinCap.parseResponse, ticker);
};

const timer = function () {
  getAllPriceData();
};

// This stands up the webpack-dev-server
const startDevServer = function() {
  console.log('Starting server (development environment) ...');

  // Hot module reloading
  // webpackConfig.entry.app.unshift('webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server');

  const compiler = webpack(webpackConfig);
  const options = {
    // contentBase: './dist',
    hot: true,
    host: 'localhost',
  };

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

  WebpackDevServer.addDevServerEntrypoints(webpackConfig, options);
  getAllPriceData();
  let intervalId = setInterval(timer, refreshCurrentPrices);
  server.listen(8080, 'localhost', () => {
    console.log('Development server listening on port 8080');
  });
};

// This stands up the express.js API
const startDevAPI = function() {
  console.log('Starting client API ...');
  const app = express();
  routes.defineApi(app);
  app.listen(8081, () => {
    console.log('Client API is up!');
  });
};

// Note - in real world the development code should not be copied
// over to the production server.
const startProductionServer = function() { 
  console.log('Starting server (production environment) ...');

  // start client API
  const app = express();
  app.use('/', express.static('bundle'));
  routes.defineApi(app);

  // populate the database
  getAllPriceData();
  let intervalId = setInterval(timer, refreshCurrentPrices);  
  app.listen(8080, () => {
    console.log('Production server is up!');
  });
};

// Main process
if (process.env.NODE_ENV === 'dev-server') {
  startDevServer(); 
} 
else if (process.env.NODE_ENV === 'dev-api') {
  startDevAPI();
} 
else { 
  startProductionServer();  // TODO - not tested
}

