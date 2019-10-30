const moment = require('moment');

module.exports = {
    getPrimaryCategory: function(req, res, next) {
        let baseQuery = `SELECT cat_id, cat_name FROM health.primary_category;`;
        
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
        let baseQuery = `SELECT subcat_id, subcat_name FROM health.subcategory;`;

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
        let baseQuery = `SELECT insur_id, insur_name FROM health.insurance;`;

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

    createService: function(req, res, next) {
        let idQuery = `SELECT pg_catalog.setval(pg_get_serial_sequence('health.services_master', 'service_id'), MAX(service_id)) FROM health.services_master;`;
        req.db.any(idQuery)
        .then(data => {  
            if (data.length === 0 && data[0].setval) {
                res.status(500).json("Database error, please contact admin")
            }  
            let service_id = parseInt(data[0].setval) + 1;

            let today = moment().format('YYYY-MM-DDTHH:mm:ss.sssZ');
            let counter = 1;
            let values = [];

            // add date
            let createServiceInsert = `INSERT INTO health.services_master ("last_verified"`;
            let createServiceValues = `VALUES ($${counter}`;
            values.push(`${today}`);
            counter++;

            // add ID
            createServiceInsert += `,"service_id"`;
            createServiceValues += `,$${counter}`;
            values.push(`${service_id}`);
            counter++;

            if (req.body.primary_cat_id) {
                if (isNaN(req.body.primary_cat_id)) {
                    return res.status(400).json("Category ID must be an integer");
                }
                createServiceInsert += `,"primary_cat_id"`;
                createServiceValues += `,$${counter}`;
                values.push(`${req.body.primary_cat_id}`);
                counter++;
            }
            if (req.body.sub_cat_id) {
                if (isNaN(req.body.sub_cat_id)) {
                    return res.status(400).json("Subcategory ID must be an integer");
                }
                createServiceInsert += `,"sub_cat_id"`;
                createServiceValues += `,$${counter}`;
                values.push(`${req.body.sub_cat_id}`);
                counter++;
            }
            if (req.body.insur_id) {
                if (isNaN(req.body.insur_id)) {
                    return res.status(400).json("Insurance ID must be an integer");
                }
                createServiceInsert += `,"insur_id"`;
                createServiceValues += `,$${counter}`;
                values.push(`${req.body.insur_id}`);
                counter++;
            }
            if (req.body.languages_spoken) {
                createServiceInsert += `,"languages_spoken"`;
                createServiceValues += `,$${counter}`;
                values.push(`${req.body.languages_spoken}`);
                counter++;
            }
            if (req.body.name) {
                createServiceInsert += `,"name"`;
                createServiceValues += `,$${counter}`;
                values.push(`${req.body.name}`);
                counter++;
            }
            if (req.body.address) {
                createServiceInsert += `,"address"`;
                createServiceValues += `,$${counter}`;
                values.push(`${req.body.address}`);
                counter++;
            }
            if (req.body.lat) {
                createServiceInsert += `,"lat"`;
                createServiceValues += `,$${counter}`;
                values.push(`${req.body.lat}`);
                counter++;
            }
            if (req.body.lon) {
                createServiceInsert += `,"lon"`;
                createServiceValues += `,$${counter}`;
                values.push(`${req.body.lon}`);
                counter++;
            }
            if (req.body.transit) {
                createServiceInsert += `,"transit"`;
                createServiceValues += `,$${counter}`;
                values.push(`${req.body.transit}`);
                counter++;
            }
            if (req.body.website) {
                createServiceInsert += `,"website"`;
                createServiceValues += `,$${counter}`;
                values.push(`${req.body.website}`);
                counter++;
            }
            if (req.body.phone_num) {
                createServiceInsert += `,"phone_num"`;
                createServiceValues += `,$${counter}`;
                values.push(`${req.body.phone_num}`);
                counter++;
            }
            if (req.body.emergency_num) {
                createServiceInsert += `,"emergency_num"`;
                createServiceValues += `,$${counter}`;
                values.push(`${req.body.emergency_num}`);
                counter++;
            }
            if (req.body.services) {
                createServiceInsert += `,"services"`;
                createServiceValues += `,$${counter}`;
                values.push(`${req.body.services}`);
                counter++;
            }
            if (req.body.drop_in) {
                createServiceInsert += `,"drop_in"`;
                createServiceValues += `,$${counter}`;
                values.push(`${req.body.drop_in}`);
                counter++;
            }
            if (req.body.notes) {
                createServiceInsert += `,"notes"`;
                createServiceValues += `,$${counter}`;
                values.push(`${req.body.notes}`);
                counter++;
            }
            if (req.body.notes_fr) {
                createServiceInsert += `,"notes_fr"`;
                createServiceValues += `,$${counter}`;
                values.push(`${req.body.notes_fr}`);
                counter++;
            }
            if (req.body.services_fr) {
                createServiceInsert += `,"services_fr"`;
                createServiceValues += `,$${counter}`;
                values.push(`${req.body.services_fr}`);
                counter++;
            }
            if (req.body.verified_by) {
                createServiceInsert += `,"verified_by"`;
                createServiceValues += `,$${counter}`;
                values.push(`${req.body.verified_by}`);
                counter++;
            }

            createServiceInsert += `)`;
            createServiceValues += `)`;
            let createService = `${createServiceInsert} ${createServiceValues}`;
            
            req.db.any(createService, values)
            .then(serviceData => {
                //console.log('SERVICE DATA:', serviceData); // prints data, use data[i] to print specific entry attributes
                // Add business hours
                if (req.body.hours) {
                    if (req.body.hours.split(',').length !== 7) {
                        return res.status(400).json("Incorrect business hours format");
                    }

                    let addBusinessHours = `
                    INSERT INTO 
                    health.business_hours (
                        "service_id",
                        "hours"
                    )
                    VALUES (
                        $1,
                        $2
                    )
                    `;
                    let hoursValues = [service_id, req.body.hours];

                    req.db.any(addBusinessHours, hoursValues)
                    .then(hoursData => {
                        //console.log('HOURS DATA:', hoursData)
                        res.status(200).json("Created service");
                    })
                    .catch(error => {
                        console.log('ERROR HOURS:', error); // print the error;
                        res.status(500).json(error);
                    })
                }
                else {
                    res.status(200).json("Created service");
                }
            })
            .catch(error => {
                console.log('ERROR SERVICE:', error); // print the error;
                res.status(500).json(error);
            })
        })
        .catch(error => {
            console.log('ERROR SERVICE ID:', error); // print the error;
            res.status(500).json(error);
        })
        
    },

    getService: function(req, res, next) {
        let baseQuery = `
        SELECT * 
        FROM health.services_master 
        INNER JOIN health.business_hours as h
        ON h.service_id = services_master.service_id
        `;
        req.db.any(baseQuery)
        .then(data => {
            //console.log('DATA:', data);
            res.status(200).json(data);
        })
        .catch(error => {
            console.log(error)
            res.status(500).json('there has been an error, please contact Student Services to get this fixed.');
        })
    }
}