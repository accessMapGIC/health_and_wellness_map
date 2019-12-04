const moment = require('moment');

module.exports = {
    createReportedError: function(req, res, next) {
            req.db.any( 'SELECT * FROM health.report_errors')
            .then(data => {
                let id = data.length + 1 
                let baseQuery = `INSERT INTO health.report_errors("id", "email", "content") VALUES ($1, $2, $3) RETURNING *;`;
                let values = [`${id}`, `${req.body.email}`, `${req.body.content}` ];
                req.db.any(baseQuery, values)
                .then(data => {
                    console.log('DATA:', data); // prints data, use data[i] to print specific entry attributes
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

    getReportedError: function(req, res, next) {
        let baseQuery = `
        SELECT * 
        FROM health.report_errors 
        `;
        req.db.any(baseQuery)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            console.log(error)
            res.status(500).json('there has been an error, please contact Student Services to get this fixed.');
        })
    },

    deleteReportedError: function(req, res, next) {
        let baseQuery = `DELETE FROM health.report_errors WHERE id = ${req.body.Id} RETURNING *;`;

        req.db.any(baseQuery)
        .then(data => {

            if (data.length === 0) {
                return res.status(404).json("Category not found");
            }
            
            
                return res.status(200).json(data[0]);
           

        })
        .catch(error => {
            console.log('ERROR:', error); // print the error;
            res.status(500).json('there has been an error, please contact Student Services to get this fixed.');
        })
    }
}