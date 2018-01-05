
## Author
Michael V Pratt  [ github.com/mvpratt ] [ Twitter: @mikevpratt ]

## Description
A webapp to find the best exchange price for several cryptocurrencies. 
* Currencies: ETH, LTC, DASH
* Exchanges: Poloniex, Kraken, Bittrex

## Requirements
 * Node.js v8.4.0
 * PostgreSQL
 * See package.json for additional details

## Architecture
Back-end:
Node.js Server gets the latest exhange rates stores in a local database, 
makes a REST API available to the Client webapp

Front-end:
React.js Client displays the latest prices as well as historical trends.  
The current best price is highlighted.  User may view 1 day, 7 day, 30 day, 
and 0 day price trends (default is 30 day)

Init:
An initialization script sets up the database

## Installation
There are two main steps (1) Set up PostgreSQL on your local machine and (2) install the NodeJS webapp
1. Install PostgreSQL (https://www.postgresql.org)
2. Create a database called 'sample_db' (https://www.codementor.io/devops/tutorial/getting-started-postgresql-server-mac-osx)
3. `npm install`
4. `npm run dbinit`
5. `npm run build`
6. `npm run dev`

## Files
/api - Exchange APIs
/db/db.js - PSQL database library
/db/dbInit - Script to initialize the `prices` table 
/db/dbConfig - User name and pwd for postgresql
/dist - Client code bundled for production
/routes - REST API
/server.js - NodeJS server code
/src - Client source code
/webpack.config.js - Webpack configuration


## Screenshot
https://github.com/mvpratt/best-price/Screenshot.png
