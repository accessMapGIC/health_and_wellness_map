const moment = require('moment');

module.exports = {
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
            // console.log('DATA:', data);
            res.status(200).json(data);
        })
        .catch(error => {
            console.log(error)
            res.status(500).json('there has been an error, please contact Student Services to get this fixed.');
        })
    },

    editService: function(req, res, next) {
        let idQuery = `SELECT pg_catalog.setval(pg_get_serial_sequence('health.services_master', 'service_id'), MAX(service_id)) FROM health.services_master;`;
        req.db.any(idQuery)
        .then(data => {
            let today = moment().format('YYYY-MM-DDTHH:mm:ss.sssZ');
            let counter = 1;
            let values = [];

            let updateServiceSet = `UPDATE health.services_master SET last_verified = $${counter}`;
            let updateServiceId = `WHERE service_id = ${req.params.serviceId};`;
            values.push(`${today}`);
            counter++;
            if (req.body.values.primary_cat_id) {
                if (isNaN(req.body.values.primary_cat_id)) {
                    return res.status(400).json("Category ID must be an interger la");
                }
                updateServiceSet += `, primary_cat_id = $${counter}`;
                values.push(`${req.body.values.primary_cat_id}`);
                counter++;
            }

            if (req.body.values.sub_cat_id) {
                if (isNaN(req.body.values.sub_cat_id)) {
                    return res.status(400).json("Subcategory ID must be an integer");
                }
                updateServiceSet += `, sub_cat_id = $${counter}`;
                values.push(`${req.body.values.sub_cat_id}`);
                counter++;
            }

            if (req.body.values.insur_id) {
                if (isNaN(req.body.values.insur_id)) {
                    return res.status(400).json("Insurance ID must be an integer");
                }
                updateServiceSet += `, insur_id = $${counter}`;
                values.push(`${req.body.values.insur_id}`);
                counter++;
            }

            if (req.body.values.languages_spoken) {
                updateServiceSet += `, languages_spoken = $${counter}`;
                values.push(`${req.body.values.languages_spoken}`);
                counter++;
            }

            if (req.body.values.name) {
                updateServiceSet += `, name = $${counter}`;
                values.push(`${req.body.values.name}`);
                counter++;
            }

            if (req.body.values.address) {
                updateServiceSet += `, address = $${counter}`;
                values.push(`${req.body.values.address}`);
                counter++;
            }

            if (req.body.values.lat) {
                updateServiceSet += `, lat = $${counter}`;
                values.push(`${req.body.values.lat}`);
                counter++;
            }

            if (req.body.values.lon) {
                updateServiceSet += `, lon = $${counter}`;
                values.push(`${req.body.values.lon}`);
                counter++;
            }

            if (req.body.values.transit) {
                updateServiceSet += `, transit = $${counter}`;
                values.push(`${req.body.values.transit}`);
                counter++;
            }
            
            if (req.body.values.website) {
                updateServiceSet += `, website = $${counter}`;
                values.push(`${req.body.values.website}`);
                counter++;
            }

            if (req.body.values.phone_num) {
                updateServiceSet += `, phone_num = $${counter}`;
                values.push(`${req.body.values.phone_num}`);
                counter++;
            }

            if (req.body.values.emergency_num) {
                updateServiceSet += `, emergency_num = $${counter}`;
                values.push(`${req.body.values.emergency_num}`);
                counter++;
            }

            if (req.body.values.services) {
                updateServiceSet += `, services = $${counter}`;
                values.push(`${req.body.values.services}`);
                counter++;
            }

            if (req.body.values.services_fr) {
                updateServiceSet += `, services = $${counter}`;
                values.push(`${req.body.values.services_fr}`);
                counter++;
            }

            if (req.body.values.drop_in) {
                updateServiceSet += `, drop_in = $${counter}`;
                values.push(`${req.body.values.drop_in}`);
                counter++;
            }

            if (req.body.values.notes) {
                updateServiceSet += `, notes = $${counter}`;
                values.push(`${req.body.values.notes}`);
                counter++;
            }

            if (req.body.values.notes_fr) {
                updateServiceSet += `, notes_fr = $${counter}`;
                values.push(`${req.body.values.notes_fr}`);
                counter++;
            }

            if (req.body.values.verified_by) {
                updateServiceSet += `, verified_by = $${counter}`;
                values.push(`${req.body.values.verified_by}`);
                counter++;
            }
            let updateService = `${updateServiceSet} ${updateServiceId}`;
            req.db.any(updateService, values)
            .then(serviceData => {
                if (req.body.values.hours) {
                    if (req.body.values.hours.split(',').length !== 7) {
                        return res.status(400).json("Incorrect business hours format");
                    }
                    let updateBusinessHours = `
                    UPDATE health.business_hours 
                    SET hours = '${req.body.values.hours}'
                    WHERE service_id = ${req.params.serviceId} 
                    `;
                    let hoursValues = [req.params.serviceId, req.body.values.hours];
                    req.db.any(updateBusinessHours)
                    .then(hoursData => {
                        //console.log(hoursData)
                        res.status(200).json(hoursData);
                    })
                    .catch(error => {
                        console.log('ERROR HOURS:', error); // print the error;
                        res.status(500).json(error);
                    })
                }
                else {
                    res.status(200).json(serviceData);
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
    }
}