import * as actionTypes from '../actions';
import pool from '../db';

const initialState = {

}

const dbReducer = (state = initialState, action ) => {
    switch ( action.type ){
        case actionTypes.QUERY_DATABASE:
            const newState = Object.assign({}, state);
            // db.oneOrNone(
            //     'SELECT s.service_id, s.name, s.address, s.phone_num AS phone, s.lat AS x, s.lon AS y, s.website AS URL, h.hours, pc.cat_name as primary_category,sc.subcat_name as subcategory FROM health.services_master s LEFT JOIN health.business_hours h ON s.service_id = h.id LEFT JOIN health.primary_category pc ON s.primary_cat_id = pc.cat_id LEFT JOIN health.subcategory sc ON pc.cat_id = sc.pc_id WHERE pc.cat_name = "$1" AND sc.subcat_name = "$2"', [action.payload.cat, action.payload.subCat])
            // .then(data => {
            //     console.log(data);
            // })
            // .catch(error => {
            //     // error
            // });
            pool.connect((err, client, release) => {
                if (err) {
                  return console.error('Error acquiring client', err.stack)
                }
                client.query('SELECT NOW()', (err, result) => {
                  release()
                  if (err) {
                    return console.error('Error executing query', err.stack)
                  }
                  console.log(result.rows)
                })
              })
              

            
            return newState;
        default: 
            return state;
    }
}

export default dbReducer;