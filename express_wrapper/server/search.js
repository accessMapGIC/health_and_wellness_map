
module.exports = {
    getServices: function(req, res, next) {
        req.db.any(
            `
            SELECT * FROM services_master
            LIMIT 1;
            `
          ).then(data => {
            res.send('data received'); //just data.
          })
          .catch(err => res.status(400).send(err))
    },

    getCategories: function(req, res, next) {
        //this is the main category query
        let baseQuery = `
        SELECT
            s.service_id,
            pc.cat_name as primary_category,
            sc.subcat_name as subcategory,
            s.name,
            s.address,
            s.phone_num as phone,
            s.lat as x,
            s.lon as y,
            s.website AS URL,
            s.notes,
            s.notes_fr,
            s.languages_spoken,
            h.hours
        FROM health.primary_category pc INNER JOIN health.subcategory sc
        ON pc.cat_id = sc.pc_id
        INNER JOIN health.services_master as s
        ON s.sub_cat_id = sc.subcat_id
        INNER JOIN health.business_hours as h
        ON h.service_id = s.service_id
        LEFT JOIN health.insurance as ins
        ON ins.insur_id = s.insur_id
        `;
        let params = [];

        if (req.body.cat) {
            params.push({key: "pc.cat_name", value: req.body.cat});
            params.push()
        }

        if (req.body.subCat) {
            params.push({key: "sc.subcat_name", value: req.body.subCat});
        }

        if (req.body.insCat) {
            params.push({key: "ins.insur_name", value: req.body.insCat});
        }

        if (params.length) {
            baseQuery += " WHERE ";
            for (let i = 0; i < params.length; i++) {
                if (i > 0) {
                baseQuery += " AND ";
                }
                baseQuery += `${params[i].key} = $${i+1}`;
            }
        }

        if (req.body.lang) { 
            baseQuery += ` AND s.languages_spoken ILIKE $${params.length+1}`;
            params.push({key: "s.languages_spoken", value: `%${req.body.lang}%`});
        }

        req.db.any(baseQuery, params.map(p => p.value))
        .then(data => {
            //console.log('DATA:', baseQuery); // prints data, use data[i] to print specific entry attributes
            res.send(data);
        })
        .catch(error => {
        console.log(error);
            res.send('there has been an error, please contact Student Services to get this fixed.');
        })
    },

    getKeywords: function(req, res, next) {
        let baseQuery = `
            SELECT
            s.service_id,
            pc.cat_name as primary_category,
            sc.subcat_name as subcategory,
            s.name,
            s.address,
            s.phone_num as phone,
            s.lat as x,
            s.lon as y,
            s.website AS URL,
            s.notes,
            s.notes_fr,
            s.languages_spoken,
            h.hours
            FROM health.primary_category pc INNER JOIN health.subcategory sc
            ON pc.cat_id = sc.pc_id
            INNER JOIN health.services_master as s
            ON s.sub_cat_id = sc.subcat_id
            INNER JOIN health.business_hours as h
            ON h.service_id = s.service_id
            LEFT JOIN health.insurance as ins
            ON ins.insur_id = s.insur_id
            WHERE s.services LIKE ANY (string_to_array(LOWER($1),','))
        `;
        let params = [`%${req.body.keyword}%`];
        let counter = 2;

        if (req.body.insCat) {
            baseQuery += ` AND ins.insur_name=$${counter}`
            params.push(req.body.insCat);
            counter++;
        }

        if (req.body.lang) { 
            baseQuery += ` AND s.languages_spoken ILIKE $${counter}`;
            params.push(`%${req.body.lang}%`);
            counter++;
        }

        req.db.any(baseQuery, params)
        .then(data => {
            // console.log('DATA:', data); // prints data, use data[i] to print specific entry attributes
            res.send(data);
        })
        .catch(error => {
            //console.log('ERROR:', error); // print the error;
            res.send('there has been an error, please contact Student Services to get this fixed.');
        })
    }
}