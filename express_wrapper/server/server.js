//This file is for creating the api calls and connecting to the postgres server

const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv').config(); //Might need working on as currently values in .ENV don't work...
const port = process.env.PORT || 8080; //<- this port number needs to match the proxy port written in mapClient's package.json file
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

//Get the cookie
app.use(cookieParser())

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.listen(port, () => console.log(`Listening on port ${port}`)); //just prints in the console *this can be commented out once the project is running

// Setup DB connection
const promise = require('bluebird'); //this is a promise library for correct database access
const initOptions = {
    promiseLib: promise
} //adds bluebird to the pg-promise
const pgp = require('pg-promise')(initOptions); //this creates pg-promise object
const cn = {
  host: process.env.PG_HOST, //host:'map.geog.mcgill.ca',
  port: process.env.PG_PORT, //port: 49495,
  database: process.env.PG_DATABASE, //database:'map',
  user: process.env.PG_USERNAME, //user: 'noe',
  password: process.env.PG_PASSWORD
}//login credentials should be hidden in the .env imported as above from the .env file
const db = pgp(cn); //create a db object from the pg-promise object with the above credentials
app.use(function (req, res, next) {
  req.db = db;
  next();
});

// Test route
app.get('/test', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT :D' }); //sample test *this can be commented out once the app is working
  console.log('test connection successfull');
});

// APIs
const Search = require('./search');
const Service = require('./service');
const Auth = require('./auth');
const Category = require('./category');
const Subcategory = require('./subcategory');



// Search query routes
app.post('/query', Auth.authMiddleware, Search.getServices);
app.post('/category_query', Auth.authMiddleware, Search.getCategories);
app.post('/keywords_query', Auth.authMiddleware, Search.getKeywords);

// Get list of categories and insurance
app.get('/insurance', Auth.authMiddleware, Service.getInsurance);
// Create a new service
app.post('/service', Auth.authMiddleware, Service.createService);
// Get service
app.get('/services', Auth.authMiddleware, Service.getService);
// Edit service
app.put('/service/:serviceId', Auth.authMiddleware, Service.editService);

// Categories
app.post('/primary_category', Auth.authMiddleware, Category.createPrimaryCategory);
app.get('/primary_category', Auth.authMiddleware, Category.getPrimaryCategories);
app.get('/primary_category/:categoryId', Auth.authMiddleware, Category.getPrimaryCategory);
app.put('/primary_category/:categoryId', Auth.authMiddleware, Category.updatePrimaryCategory);
app.delete('/primary_category/:categoryId', Auth.authMiddleware, Category.deletePrimaryCategory);

app.post('/subcategory', Auth.authMiddleware, Subcategory.createSubcategory);
app.get('/subcategory', Auth.authMiddleware, Subcategory.getSubcategories);
app.get('/subcategory/:subcategoryId', Auth.authMiddleware, Subcategory.getSubcategory);
app.put('/subcategory/:subcategoryId', Auth.authMiddleware, Subcategory.updateSubcategory);
app.delete('/subcategory/:subcategoryId', Auth.authMiddleware, Subcategory.deleteSubcategory);


//Login user
app.post('/signin', Auth.signin);
app.get('/logout', Auth.logOut);
