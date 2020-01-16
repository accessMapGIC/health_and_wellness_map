const moment = require('moment');

module.exports = {
    createPrimaryCategory: function(req, res, next) {
        let idQuery = `SELECT pg_catalog.setval(pg_get_serial_sequence('health.primary_category', 'cat_id'), MAX(cat_id)) FROM health.primary_category;`;
        req.db.any(idQuery)
        .then(data => {
            if (data.length === 0 && data[0].setval) {
                res.status(500).json("Database error, please contact admin")
            }  
            let cat_id = parseInt(data[0].setval) + 1;

            if (!req.body.cat_name) {
                return res.status(400).json("Category name required")
            }

            let baseQuery = `INSERT INTO health.primary_category("cat_id", "cat_name") VALUES ($1, $2) RETURNING *;`;
            let values = [`${cat_id}`, `${req.body.cat_name}`];

            req.db.any(baseQuery, values)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(error => {
                console.log('ERROR:', error); // print the error;
                res.status(500).json('there has been an error, please contact Student Services to get this fixed.');
            })
        })
        .catch(error => {
            console.log('ERROR:', error); // print the error;
            res.status(500).json('there has been an error, please contact Student Services to get this fixed.');
        })
    }, 

    getPrimaryCategories: function(req, res, next) {
        let baseQuery = `SELECT * FROM health.primary_category ORDER BY cat_id;`;
        
        req.db.any(baseQuery)
        .then(data => {
            //console.log('DATA:', data); // prints data, use data[i] to print specific entry attributes
            res.status(200).json(data);
        })
        .catch(error => {
            //console.log('ERROR:', error); // print the error;
            res.status(500).json('there has been an error, please contact Student Services to get this fixed.');
        })
    },

    getPrimaryCategory: function(req, res, next) {
        let baseQuery = `SELECT * FROM health.primary_category WHERE cat_id = $1;`;
        let values = [`${req.params.categoryId}`];

        req.db.any(baseQuery, values)
        .then(data => {
            if (data.length === 0) {
                return res.status(404).json("Category not found");
            }
            return res.status(200).json(data[0]);
        })
        .catch(error => {
            //console.log('ERROR:', error); // print the error;
            res.status(500).json('there has been an error, please contact Student Services to get this fixed.');
        })
    },

    updatePrimaryCategory: function(req, res, next) {
        if (!req.body.cat_name) {
            return res.status(400).json("Category name required")
        }

        let baseQuery = `UPDATE health.primary_category SET cat_name = $1 WHERE cat_id = $2 RETURNING *;`;
        let values = [`${req.body.cat_name}`,`${req.params.categoryId}`];

        req.db.any(baseQuery, values)
        .then(data => {
            if (data.length === 0) {
                return res.status(404).json("Category not found");
            }
            return res.status(200).json(data[0]);
        })
        .catch(error => {
            //console.log('ERROR:', error); // print the error;
            res.status(500).json('there has been an error, please contact Student Services to get this fixed.');
        })
    },

    deletePrimaryCategory: function(req, res, next) {

        let baseQuery = `DELETE FROM health.primary_category WHERE cat_id = $1 RETURNING *;`;
        let values = [`${req.params.categoryId}`];

        req.db.any(baseQuery, values)
        .then(data => {
            if (data.length === 0) {
                return res.status(404).json("Category not found");
            }
        })
        .catch(error => {
            console.log('ERROR:', error); // print the error;
            res.status(500).json('there has been an error, please contact Student Services to get this fixed.');
        })
    }
    
}