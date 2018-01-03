

## Author
Michael V Pratt  [ github.com/mvpratt ] [ Twitter: @mikevpratt ]

## Description
A webapp to find the best exchange price for several currencies.

## Tool Versions 
 * Node.js v8.4.0
 * see package.json

## Architecture

Back-end:
Node.js  Gets exchange rate info and stores it in database

Front-end:
React.js  Query's database and displays it in webapp
Allows user to query based on 1day, 7day, 30day, 90day (default is 7day)

Guidelines:
* Assume front-end and back-end are asynchronous
* Beware global variables
* Organize code into modules
* Use promises vs callbacks 
* Use REST APIs vs socket

Init:
An initialization script sets up the database


Poloniex API:
============
Documntation
https://poloniex.com/support/api/

Max request rate:  
6 calls/sec

REST URL:
Call: https://poloniex.com/public?command=returnTicker/<ticker>
Returns the ticker for all markets.

Response:

{
  "BTC_LTC":{
    "last":"0.0251","lowestAsk":"0.02589999","highestBid":"0.0251","percentChange":"0.02390438",
    "baseVolume":"6.16485315","quoteVolume":"245.82513926"
  },
  "BTC_NXT":{
    "last":"0.00005730","lowestAsk":"0.00005710","highestBid":"0.00004903","percentChange":"0.16701570",
    "baseVolume":"0.45347489","quoteVolume":"9094"
  }, ... 
}


Kraken API:
==========
Description
https://www.kraken.com/help/api#public-market-data

Example code:
https://github.com/nothingisdead/npm-kraken-api

REST URL
https://api.kraken.com/0/public/Ticker/<pair>

Input:
<pair> = comma delimited list of asset pairs to get info on

Response: 
Array of pair names and their ticker info

<pair_name> = pair name
    a = ask array(<price>, <whole lot volume>, <lot volume>),
    b = bid array(<price>, <whole lot volume>, <lot volume>),
    c = last trade closed array(<price>, <lot volume>),
    v = volume array(<today>, <last 24 hours>),
    p = volume weighted average price array(<today>, <last 24 hours>),
    t = number of trades array(<today>, <last 24 hours>),
    l = low array(<today>, <last 24 hours>),
    h = high array(<today>, <last 24 hours>),
    o = today's opening price

Note: Today's prices start at 00:00:00 UTC

Response:

{"error":[],"result":{"XETHXXBT":{"a":["0.038760","1","1.000"],"b":["0.038600","1","1.000"],"c":["0.038610","4.58738200"],"v":["48557.19438812","53324.47694144"],"p":["0.037410","0.032801"],"t":[9865,12027],"l":["0.035000","0.035000"],"h":["0.041860","0.042260"],"o":"0.041720"}}}


Bittrex API:
===========

REST URL
https://bittrex.com/api/v1.1/public/getticker/BTC-LTC 

Response:

{
    "success" : true,
    "message" : "",
    "result" : {
        "Bid" : 2.05670368,
        "Ask" : 3.35579531,
        "Last" : 3.35579531
    }
}

Coincap.io API:
==============

Documentation
https://github.com/CoinCapDev/CoinCap.io

CLI example
https://github.com/sebs/capcoin

Price History
http://coincap.io/history/BTC   --- note: returns all history
http://coincap.io/history/7day/BTC
http://coincap.io/history/30day/BTC
1day -> 185 samples.  approx 7 mins/sample.  oldest first

Response:
{
    "market_cap": [
        [
            1504664370000,  // unix time (milliseconds)
            74300994770     // market cap
        ],
        [
            1504750775000,
            74594182198
        ]
    ],
    "price" : [
        [
            1504750775000,
            4507.45 
        ],
        [
            1504839280000,
            4599.26
        ]
    ],
    "volume": [
        [
            1504750775000,  
            2095800000   
        ],
        [
            1504839280000,
            1752760000
        ]
    ]
}
 











