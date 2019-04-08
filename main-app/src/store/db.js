var pg = require('pg');

// Preparing the connection details:

var connectionString = "postgres://ryan:ryan_g1C@map.geog.mcgill.ca/ip:49495/map";

var pgClient = new pg.Client(connectionString);

export default pgClient;

// const pool = new Pool({
//     user: 'health_query',
//     host: 'http://map.geog.mcgill.ca',
//     database: 'map',
//     password: '2oVauDE',
//     port: 49495,
//     max: 20,
//     idleTimeoutMillis: 30000,
//     connectionTimeoutMillis: 2000,
// });

// // module.exports = {
// //     query: (text, params, callback) => {
// //       return pool.query(text, params, callback)
// //     }
// //   }
  
// export default pool;