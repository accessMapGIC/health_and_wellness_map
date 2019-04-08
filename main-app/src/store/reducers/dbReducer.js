import * as actionTypes from '../actions';
import pgClient from '../db';

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
            pgClient.connect();
            var query = pgClient.query("SELECT service_id,name FROM health.service_master where name = 'Hotel Dieu'");

            query.on("row", function(row,result){
                result.addRow(row);
                console.log(result);
            });
    
            pgClient.end();
            
            return newState;
        default: 
            return state;
    }
}

export default dbReducer;