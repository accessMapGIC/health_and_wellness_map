//This file is for creating the api calls and connecting to the postgres server

const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv').config(); //Might need working on as currently values in .ENV don't work...
const promise = require('bluebird'); //this is a promise library for correct database access
const monitor = require('pg-monitor'); //middleware to show the query used in the console 
const port = process.env.PORT || 5001; //<- this port number needs to match the proxy port written in mapClient's package.json file
const bodyParser = require('body-parser');
const initOptions = {
  promiseLib: promise
}//adds bluebird to the pg-promise
monitor.attach(initOptions)//PG-Monitor
const pgp = require('pg-promise')(initOptions); //this creates pg-promise object

//Middleware
app.use(cors());
app.use(bodyParser.json());

const cn = {
  host:'map.geog.mcgill.ca',
  port: '49495',
  database: 'map',
  user: 'noe',
  password: process.env.PG_PASSWORD
}//login credentials should be hidden in the .env imported as above from the .env file

const db = pgp(cn); //create a db object from the pg-promise object with the above credentials

app.listen(port, () => console.log(`Listening on port ${port}`)); //just prints in the console *this can be commented out once the project is running

  // create a GET route
app.get('/test', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //sample test *this can be commented out once the app is working
  console.log('test connection successfull');
});

app.post('/query', (req, res) => {
  db.any(
    `
    SELECT * FROM services_master
    LIMIT 1;
    `
  ).then(data => {
    //console.log(`Data: ${data}`);
    res.send('data received'); //just data.
  }).catch(err => res.status(400).send(err))
})

app.post('/category_query', (req, res) => { //this is the main category query

  let baseQuery = `
    SELECT
        s.service_id,
        s.name,
        s.address,
        s.phone_num AS phone,
        s.lat AS x,
        s.lon AS y,
        s.website AS URL,
        h.hours,
        pc.cat_name as primary_category,
        sc.subcat_name as subcategory
    FROM health.services_master s
    LEFT JOIN health.business_hours h ON s.service_id = h.id
    LEFT JOIN health.primary_category pc ON s.primary_cat_id = pc.cat_id
    LEFT JOIN health.subcategory sc ON pc.cat_id = sc.pc_id
    JOIN health.insurance ins ON ins.insur_id = s.insur_id`;
  let params = [];

  if (req.body.cat) {
    params.push({key: "pc.cat_name", value: req.body.cat});
  }

  if (req.body.subCat) {
    params.push({key: "sc.subcat_name", value: req.body.suCat});
  }

  if (req.body.insCat) {
    params.push({key: "ins.insur_name", value: req.body.insCat});
  }

  if (params.length) {
    baseQuery += " WHERE ";
    for (let i = 0; i < params.length; i++) {
      if (i > 0) {
        baseQuery += " AND ";
      }
      baseQuery += `${params[i].key} = $${i+1}`;
    }
  }

  db.any(baseQuery, params.map(p => p.value))
  .then(data => {
      console.log('DATA:', data); // prints data, use data[i] to print specific entry attributes
      res.send(data);
  })
  .catch(error => {
      //console.log('ERROR:', error); // print the error;
      res.send('there has been an error, please contact Student Services to get this fixed.');
  })

  /* ----KEYWORD_QUERY----
  `
  SELECT
    s.service_id,
    s.services,
    s.name,
    s.address,
    s.phone_num AS phone,
    s.lat AS x,
    s.lon AS y,
    s.website AS URL,
    s.languages_spoken as lang
  FROM services_master as s
  unnest(string_to_array(services, ',')) AS k(service)
  WHERE service LIKE ANY (string_to_array(LOWER('%nurse%'),','))
  GROUP BY service_id;
  `*/
});
