
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
