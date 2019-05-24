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
    res.send('data received'); //just data.
  }).catch(err => res.status(400).send(err))
})

app.post('/category_query', (req, res) => { //this is the main category query
  let baseQuery = `
    SELECT
      s.service_id,
      pc.cat_name as primary_category,
      sc.subcat_name as subcategory,
      s.name,
      s.address,
      s.phone_num as phone,
      s.lat as x,
      s.lon as y,
      s.website AS URL,
      s.notes,
      h.hours
    FROM health.primary_category pc INNER JOIN health.subcategory sc
    ON pc.cat_id = sc.pc_id
    INNER JOIN health.services_master as s
    ON s.sub_cat_id = sc.subcat_id
    INNER JOIN health.business_hours as h
    ON h.service_id = s.service_id
    LEFT JOIN health.insurance as ins
    ON ins.insur_id = s.insur_id
  `;
  let params = [];

  if (req.body.cat) {
    params.push({key: "pc.cat_name", value: req.body.cat});
  }

  if (req.body.subCat) {
    params.push({key: "sc.subcat_name", value: req.body.subCat});
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
      res.send('there has been an error, please contact Student Services to get this fixed.');
  })
});

app.post('/keywords_query', (req, res) => { //this is the main category query
  let baseQuery = `
    SELECT
      s.service_id,
      pc.cat_name as primary_category,
      sc.subcat_name as subcategory,
      s.name,
      s.address,
      s.phone_num as phone,
      s.lat as x,
      s.lon as y,
      s.website AS URL,
      s.notes,
      h.hours
    FROM health.primary_category pc INNER JOIN health.subcategory sc
    ON pc.cat_id = sc.pc_id
    INNER JOIN health.services_master as s
    ON s.sub_cat_id = sc.subcat_id
    INNER JOIN health.business_hours as h
    ON h.service_id = s.service_id
    LEFT JOIN health.insurance as ins
    ON ins.insur_id = s.insur_id
    WHERE s.services LIKE ANY (string_to_array(LOWER($1),','))
  `;
  let params = [`%${req.body.keyword}%`];

  if (req.body.insCat) {
    baseQuery += " AND ins.insur_name=$2"
    params.push(req.body.insCat);
  }

  db.any(baseQuery, params)
  .then(data => {
      console.log('DATA:', data); // prints data, use data[i] to print specific entry attributes
      res.send(data);
  })
  .catch(error => {
      //console.log('ERROR:', error); // print the error;
      res.send('there has been an error, please contact Student Services to get this fixed.');
  })
});
