import pgp from 'pg-promise';

// Preparing the connection details:
const cn = {
    host: 'http://map.geog.mcgill.ca',
    port: 49495,
    database: 'map',
    user: 'web_query',
    password: '2oVauDE'
};

// Creating a new database instance from the connection details:
const db = pgp(cn);

// Exporting the database object for shared use:
export default db;