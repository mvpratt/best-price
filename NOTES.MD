
## TODO:

Major tasks:
  Add selector for history range (1day - 90day)  per coin
  script to start postgresql database and create the table
  protect postgres user name -- env variable
  Change db name from sample_db

  Test production server mode / deploy to Heroku
  Eth contract tie-in
  Second pass bitcoin tasks
  move data massaging from front end to backend

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