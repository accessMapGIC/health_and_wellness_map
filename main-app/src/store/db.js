import {Pool} from 'pg';

// Preparing the connection details:

const pool = new Pool({
    user: 'health_query',
    host: 'http://map.geog.mcgill.ca',
    database: 'map',
    password: '2oVauDE',
    port: 49495,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// module.exports = {
//     query: (text, params, callback) => {
//       return pool.query(text, params, callback)
//     }
//   }
  
export default pool;