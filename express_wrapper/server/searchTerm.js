const moment = require('moment');

module.exports = {
    getSearchTerm: function(req, res, next) {
        let baseQuery = `
        SELECT * 
        FROM health.search_term
        `;
        req.db.any(baseQuery)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json('there has been an error, please contact Student Services to get this fixed.');
        })
    },

}