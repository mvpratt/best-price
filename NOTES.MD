
## TODO:

Major tasks:

  handle issue with bittrex api (returning null)
  handle issue with coincap returning short history (16 samples)
  handle http errors

  Eth contract tie-in
  Second pass bitcoin tasks
  make graph container responsive
  Capitalize exchange names
  Remove dbinit script
  move all code to src
  script to start postgresql database and create the table
  Test production server mode / deploy to Heroku


Documentation:
  Architecture diagram
  REST api documentation
  Function comments

Code quality:
  Handle all errors
  Unit testing
  Check for bad input -- rest api
  How to know if db entries are stale -- did requests work> -- disp error
  Logging with Morgan js module
  react props validation -- check all -- why lint error?

Defer:
  make a global app scope
  Webpack hot module reload
  Fix favicon error
  scrub css files
  Use await?  ES6 features
  use import instead of require - ES6 - not supported by node?
  move data massaging from front end to backend

/Users/mike/projects/best-price/api/apiBittrex.js:28
[0]         db.updatePrice('DASH', 'Bittrex', datetime, obj.result.Last);
[0]                                                               ^
[0]
[0] TypeError: Cannot read property 'Last' of null
[0]     at parseResponse (/Users/mike/projects/best-price/api/apiBittrex.js:28:63)
[0]     at exports.XMLHttpRequest.parse [as onreadystatechange] (/Users/mike/projects/best-price/server.js:30:7)
[0]     at exports.XMLHttpRequest.dispatchEvent (/Users/mike/projects/best-price/node_modules/xmlhttprequest/lib/XMLHttpRequest.js:591:25)
[0]     at setState (/Users/mike/projects/best-price/node_modules/xmlhttprequest/lib/XMLHttpRequest.js:610:14)
[0]     at IncomingMessage.<anonymous> (/Users/mike/projects/best-price/node_modules/xmlhttprequest/lib/XMLHttpRequest.js:447:13)
[0]     at emitNone (events.js:110:20)
[0]     at IncomingMessage.emit (events.js:207:7)
[0]     at endReadableNT (_stream_readable.js:1059:12)
[0]     at _combinedTickCallback (internal/process/next_tick.js:138:11)
[0]     at process._tickCallback (internal/process/next_tick.js:180:9)


## References / Acknowledgements: (- see package.json for dependencies)

https://multimedia.journalism.berkeley.edu/tutorials/css-intro/

PostgreSQL
www.node-postgres.com
www.postgresql.org/
http://www.postgresqltutorial.com/

Node.js
www.nodejs.org/en/docs/

React.js
www.reactjs.org/

Webpack client and server development solve CORS
https://gorillalogic.com/blog/webpack-and-cors/
https://github.com/jeanlescure/webpack-cors-example
https://robots.thoughtbot.com/setting-up-webpack-for-react-and-hot-module-replacement#setting-up-the-webpack-dev-server

Recharts 
http://recharts.org/#/en-US/api

Express
http://expressjs.com/en/guide/routing.html

Not used:
Axios
https://github.com/axios/axios
www.notjoshmiller.com/ajax-polling-in-react-with-redux/

Node Js and React
https://hackernoon.com/how-to-combine-a-nodejs-back-end-with-a-reactjs-front-end-app-ea9b24715032
https://reactjs.org/tutorial/tutorial.html
https://facebook.github.io/react-native/docs/network.html

HTML color picker
https://www.google.com/search?q=html+color+picker&oq=html+color&aqs=chrome.0.0j69i57j0l4.2913j0j7&sourceid=chrome&ie=UTF-8

## Design Guidelines:
* Assume front-end and back-end are asynchronous
* Beware global variables
* Organize code into modules
* Use promises vs callbacks 
* Use REST APIs vs socket

