const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const promise = require('bluebird');
const port = process.env.PORT || 5000;
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
dotenv.load()

const cn = {  
  // host: process.env.HOST,
  // port: process.env.PORT,
  // database: process.env.DATABASE,
  // user: process.env.USER,
  // password: process.env.PASSWORD,
  host: 'map.geog.mcgill.ca',
  port: 49495,
  database: 'map',
  user: 'ryan',
  password: 'ryan_g1C'
}

const db = pgp(cn);

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/express_test', (req, res) => {
  // res.send({rows: 'WE MAKE IT HERE< BUT NO DB'});
  db.any('select * from services_master LIMIT 10')
    .then(data => {
        console.log('DATA:', data); // print data;
        res.send({rows: 'WE FUCKING GOT SOMETHING TO WORK'});
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
        res.send({rows: 'WE FUCKING GOT SOMETHING TO WORK BUT ITS WRONG'});
    })
    .finally(db.$pool.end);
});