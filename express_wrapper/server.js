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

app.post('/category_query', (req, res) => {
  // res.send({rows: 'WE MAKE IT HERE< BUT NO DB'});
  console.log(req);
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
