const moment = require('moment');

module.exports = {
    createSubcategory: function(req, res, next) {
        let idQuery = `SELECT pg_catalog.setval(pg_get_serial_sequence('health.subcategory', 'subcat_id'), MAX(subcat_id)) FROM health.subcategory;`;
        req.db.any(idQuery)
        .then(data => {
            if (data.length === 0 && data[0].setval) {
                res.status(500).json("Database error, please contact admin")
            }  
            let subcat_id = parseInt(data[0].setval) + 1;

            if (!req.body.subcat_name) {
                return res.status(400).json("Category name required")
            }
            if (!req.body.pc_id) {
                return res.status(400).json("Primary category required")
            }

            let baseQuery = `INSERT INTO health.subcategory("subcat_id", "subcat_name", "pc_id") VALUES ($1, $2, $3) RETURNING *;`;
            let values = [`${subcat_id}`, `${req.body.subcat_name}`, `${req.body.pc_id}`];

            req.db.any(baseQuery, values)
            .then(data => {
                //console.log('DATA:', data); // prints data, use data[i] to print specific entry attributes
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

    getSubcategories: function(req, res, next) {
        let baseQuery = `SELECT * FROM health.subcategory ORDER BY subcat_id;`;

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

    getSubcategory: function(req, res, next) {
        let baseQuery = `SELECT * FROM health.subcategory WHERE subcat_id = $1;`;
        let values = [`${req.params.subcategoryId}`];

        req.db.any(baseQuery, values)
        .then(data => {
            //console.log('DATA:', data); // prints data, use data[i] to print specific entry attributes
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

    updateSubcategory: function(req, res, next) {
        if (!req.body.subcat_name) {
            return res.status(400).json("Category name required")
        }
        if (!req.body.pc_id) {
            return res.status(400).json("Primary category required")
        }

        let baseQuery = `UPDATE health.subcategory SET subcat_name = $1, pc_id = $2 WHERE subcat_id = $3 RETURNING *;`;
        let values = [`${req.body.subcat_name}`, `${req.body.pc_id}`, `${req.params.subcategoryId}`];

        req.db.any(baseQuery, values)
        .then(data => {
            //console.log('DATA:', data); // prints data, use data[i] to print specific entry attributes
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

    deleteSubcategory: function(req, res, next) {
        let updateQuery = `UPDATE health.services_master SET sub_cat_id = null WHERE sub_cat_id = $1;`;
        let values = [`${req.params.subcategoryId}`];

        req.db.any(updateQuery, values)
        .then(data => {
            let baseQuery = `DELETE FROM health.subcategory WHERE subcat_id = $1 RETURNING *;`;
            let values = [`${req.params.subcategoryId}`];

            req.db.any(baseQuery, values)
            .then(data => {
                //console.log('DATA:', data); // prints data, use data[i] to print specific entry attributes
                if (data.length === 0) {
                    return res.status(404).json("Category not found");
                }
                return res.status(200).json(data[0]);
            })
            .catch(error => {
                //console.log('ERROR:', error); // print the error;
                res.status(500).json('there has been an error, please contact Student Services to get this fixed.');
            })
        })
        .catch(error => {
            //console.log('ERROR:', error); // print the error;
            res.status(500).json('there has been an error, please contact Student Services to get this fixed.');
        })
    }

}