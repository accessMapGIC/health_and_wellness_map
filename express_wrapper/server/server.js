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

app.use(express.static(process.env.STATIC_DIR));

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
const Insurance = require('./insurance');
const feedback = require('./feedback');
const searchTerm = require('./searchTerm');


// Search query routes
app.post('/query',  Search.getServices);
app.post('/category_query', Search.getCategories);
app.post('/keywords_query',  Search.getKeywords);
app.get('/primary_category_client', Category.getPrimaryCategories);
app.post('/subcategory_client',  Subcategory.getSubcategories);
app.get('/insurance_client',  Insurance.getInsurances);

//Suggest a new Service
app.post('/service_suggestion', Service.createService);

// Create a new service
app.post('/service', Auth.auth, Service.createService);
// Get service
app.get('/services', Auth.auth, Service.getService);
// Edit service
app.put('/service/:serviceId', Auth.auth, Service.editService);
app.delete('/service/:serviceId', Auth.auth,  Service.deleteService);


// Categories
app.post('/primary_category', Auth.auth, Category.createPrimaryCategory);
app.get('/primary_category', Auth.auth, Category.getPrimaryCategories);
app.get('/primary_category/:categoryId', Auth.auth, Category.getPrimaryCategory);
app.put('/primary_category/:categoryId', Auth.auth, Category.updatePrimaryCategory);
app.delete('/primary_category/:categoryId', Auth.auth, Category.deletePrimaryCategory);

app.post('/subcategory', Auth.auth, Subcategory.createSubcategory);
app.get('/subcategory', Auth.auth, Subcategory.getSubcategories);
app.get('/subcategory/:subcategoryId', Auth.auth, Subcategory.getSubcategory);
app.put('/subcategory/:subcategoryId', Auth.auth, Subcategory.updateSubcategory);
app.delete('/subcategory/:subcategoryId', Auth.auth, Subcategory.deleteSubcategory);

app.post('/insurance', Auth.auth, Insurance.createInsurance);
app.get('/insurance', Auth.auth, Insurance.getInsurances);
app.get('/insurance/:insuranceId', Auth.auth, Insurance.getInsurance);
app.put('/insurance/:insuranceId', Auth.auth, Insurance.updateInsurance);
app.delete('/insurance/:insuranceId', Auth.auth, Insurance.deleteInsurance);

//Login user
app.post('/signin', Auth.signin);
app.get('/logout', Auth.logOut);
app.post('/auth', Auth.auth);

//Feedback
app.get('/reportedError', Auth.auth, feedback.getReportedError); 
app.delete('/reportedError/:id', Auth.auth, feedback.deleteReportedError);
// Report a error
app.post('/reportedError', feedback.createReportedError);

//Search Term
app.get('/searchTerm', Auth.auth, searchTerm.getSearchTerm);
