
## Author
Michael V Pratt  [ github.com/mvpratt ] [ Twitter: @mikevpratt ]

## Description
A webapp to find the best exchange price for several cryptocurrencies. 
* Currencies: ETH, LTC, DASH
* Exchanges: Poloniex, Kraken, Bittrex
* Price Trends: CoinCap

## Requirements
 * Node.js v8.4.0
 * PostgreSQL
 * See package.json for additional details

## Architecture
*Back-end:*  
Node.js Server gets the latest exhange rates stores in a local database, 
makes a REST API available to the Client webapp

*Front-end:*  
React.js Client displays the latest prices and how much can be saved by 
using the best exchange rate.  User may also view 1 day, 7 day, 30 day, and 
90 day price trends (default is 30 day)

*Initialization:*  
An initialization script sets up the database

## Installation
There are two main steps (1) Set up PostgreSQL on your local machine and (2) install the NodeJS webapp
1. Install PostgreSQL (https://www.postgresql.org)
2. Create a database called 'sample_db' (https://www.codementor.io/devops/tutorial/getting-started-postgresql-server-mac-osx)
3. `npm install`
4. `npm start` (shortcut) OR
* `npm run build`
* `npm run dbinit`
* `npm run dev`

## Files
`/api` - Exchange APIs  
`/db/db.js` - PSQL database api  
`/db/dbInit` - Script to initialize the `prices` table   
`/db/dbConfig` - User name and pwd for postgresql  
`/dist` - Client code bundled for production  
`/routes` - REST API  
`/server.js` - Node.js server code  
`/src` - Client source code  
`/webpack.config.js` - Webpack configuration  

## Environment Variables
These envirnment variables should be set; example values:  
PGHOST="localhost"  
PGUSER="postgres"  
PGPASSWORD="null"  
PGDATABASE="sample_db"  


## Screenshot
https://github.com/mvpratt/best-price/blob/master/BestPriceScreenshot.png
