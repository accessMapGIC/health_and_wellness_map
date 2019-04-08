const Pool = require('pg').Pool
const pool = new Pool({
    user: 'ryan',
    host: 'map.geog.mcgill.ca',
    database: 'map',
    password: 'g1C_ryan',
    port: 49495,
  })

  const getTest = (request, response) => {
    pool.query('SELECT * FROM services_master LIMIT 10', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
      getTest,
  }