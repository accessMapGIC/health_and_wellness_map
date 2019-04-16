//This file is for creating the api calls and connecting to the postgres server


const express = require('express'); //express import
const cors = require('cors'); //import cors 
// const bodyParser = require('body-parser');
const app = express(); //create the express app
const dotenv = require('dotenv').config(); //this configs the .env so we can access its info
const promise = require('bluebird'); //this is a promise library for correct database access
const port = process.env.PORT || 5001; //<- this port number needs to match the proxy port written in mapClient's package.json file

const initOptions = {
  promiseLib: promise
}//adds bluebird to the pg-promise

const pgp = require('pg-promise')(initOptions); //this creates pg-promise object

app.use(cors()); //this adds the cors support to the express server

const cn = {  
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
}//login credentials hidden in the .env imported as above from the .env file

const db = pgp(cn); //create a db object from the pg-promise object with the above credentials

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`)); //just prints in the console *this can be commented out once the project is running

// create a GET route
app.get('/test', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //sample test *this can be commented out once the app is working
});

app.post('/category_query', (req, res) => { //this is the main category query
  console.log(req); //this is an attempt to see if we receive the reqs
  db.any(
    `SELECT
    s.service_id,
    s.services,
    s.name,
    s.address,
    s.phone_num AS phone,
    s.lat AS x,
    s.lon AS y,
    s.website AS URL,
    s.languages_spoken as lang
    FROM services_master as s,
    unnest(string_to_array(services, ',')) AS k(service)
    WHERE service LIKE ANY (string_to_array(LOWER('nurse%'),','))
    GROUP BY service_id;`)
    .then(data => {
        console.log('DATA:', data); // print data;
        res.send({data});
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        res.send('there has been an error, please contact Student Services to get this fixed.');
    })
});
// [req.body.cat, req.body.subCat, req.body.insCat]
