const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv').config();
const promise = require('bluebird');
const port = process.env.PORT || 5001;
// app.use(bodyParser.json())
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

const initOptions = {
  promiseLib: promise
}

const pgp = require('pg-promise')(initOptions);

app.use(cors());

const cn = {  
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
}

const db = pgp(cn);

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/test', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/category_query', (req, res) => {
  // res.send({rows: 'WE MAKE IT HERE< BUT NO DB'});
  db.any(
  `SELECT
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
  JOIN health.insurance ins ON ins.insur_id = s.insur_id 
  WHERE pc.cat_name = 'Medical Care' AND sc.subcat_name = 'Clinic' AND ins.insur_name = 'SSMU'`)
    .then(data => {
        console.log('DATA:', data); // print data;
        res.send({data});
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        res.send('there has been an error, please contact Student Services to get this fixed.');
    })
});