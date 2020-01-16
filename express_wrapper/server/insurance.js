const moment = require('moment');

module.exports = {
    createInsurance: function(req, res, next) {
        let idQuery = `SELECT pg_catalog.setval(pg_get_serial_sequence('health.insurance', 'insur_id'), MAX(insur_id)) FROM health.insurance;`;
        req.db.any(idQuery)
        .then(data => {
            if (data.length === 0 && data[0].setval) {
                res.status(500).json("Database error, please contact admin")
            }  
            let insur_id = parseInt(data[0].setval) + 1;

            if (!req.body.insur_name) {
                return res.status(400).json("Category name required")
            }

            let baseQuery = `INSERT INTO health.insurance("insur_id", "insur_name") VALUES ($1, $2) RETURNING *;`;
            let values = [`${insur_id}`, `${req.body.insur_name}`];

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

    getInsurances: function(req, res, next) {
        let baseQuery = `SELECT * FROM health.insurance ORDER BY insur_id;`;
        
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

    getInsurance: function(req, res, next) {
        let baseQuery = `SELECT * FROM health.insurance WHERE insur_id = $1;`;
        let values = [`${req.params.categoryId}`];

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

    updateInsurance: function(req, res, next) {
        if (!req.body.insur_name) {
            return res.status(400).json("Category name required")
        }
        let baseQuery = `UPDATE health.insurance SET insur_name = $1 WHERE insur_id = $2 RETURNING *;`;
        let values = [`${req.body.insur_name}`,`${req.body.insur_id}`];

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

    deleteInsurance: function(req, res, next) {
        req.db.any(`DELETE FROM health.services_insur WHERE insur_id = ${req.params.insuranceId} RETURNING *;`)
        .then(() => {
            let baseQuery = `DELETE FROM health.insurance WHERE insur_id = $1 RETURNING *;`;
            let values = [`${req.params.insuranceId}`];

            req.db.any(baseQuery, values)
            .then(data => {
                //console.log('DATA:', data); // prints data, use data[i] to print specific entry attributes
                if (data.length === 0) {
                    return res.status(404).json("Insurance not found");
                }
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
    }
}