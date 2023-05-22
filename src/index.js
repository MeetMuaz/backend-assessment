// activate dotenv
require('dotenv').config();
// {path: __dirname + '/.env'};

// enable connection
require('./app/configs/database').connect();

// import modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet')
const routes = require('./app/routes/routes');
const mongoSanitize = require('express-mongo-sanitize');

// defining the Express app
const app = express();

// set port 
const port = process.env.PORT || 9000;

// enabling CORS for all requests
app.use(cors());

// enabling helmet for additional layer of security
app.use(helmet());

// sanitize request body, query parameters, and URL fragment
app.use(mongoSanitize());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// adding morgan to log HTTP requests
app.use(morgan('combined')); 

// defining an endpoint to return all controllers
routes(app);

// starting the server
app.listen(port, () => {
    console.log(`SERVER RUNNING 0N ${port} `);
});