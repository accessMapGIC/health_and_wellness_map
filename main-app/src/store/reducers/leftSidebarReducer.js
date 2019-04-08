import * as actionTypes from '../actions'
// import db from '../db';

const initialState = {
    leftMenu: {
        catDrop: '',
        insDrop: '',
        langDrop: '',
        keyDrop: '',
        subCatDrop: '',
        openNow: false,
    }
}

const leftSidebarReducer = (state = initialState, action ) => {
    switch ( action.type ){
        case actionTypes.CATEGORY_CHANGE:
            const newState = Object.assign({}, state);
            newState.leftMenu.catDrop = action.payload;
            console.log(newState);
            return newState;
        case actionTypes.SUBCATEGORY_CHANGE:
            return {
                ...state,
                leftMenu: {
                    ...state.leftMenu,
                    subCatDrop: action.payload
                },
            }
        case actionTypes.INSURANCE_CHANGE:
            return {
                ...state,
                leftMenu: {
                    ...state.leftMenu,
                    insDrop: action.payload
                },
            }
        case actionTypes.KEYWORD_CHANGE:
            return {
                ...state,
                leftMenu: {
                    ...state.leftMenu,
                    keyDrop: action.payload
                },
            }
        case actionTypes.LANGUAGE_CHANGE:
            return {
                ...state,
                leftMenu: {
                    ...state.leftMenu,
                    langDrop: action.payload
                },
            }
        case actionTypes.ON_IS_OPEN_CHANGE:
            return {
                ...state,
                leftMenu: {
                    ...state.leftMenu,
                    openNow: !state.leftMenu.openNow
                }
            }
        // case actionTypes.QUERY_DATABASE:
        //     db.each(
        //         'SELECT s.service_id, s.name, s.address, s.phone_num AS phone, s.lat AS x, s.lon AS y, s.website AS URL, h.hours, pc.cat_name as primary_category,sc.subcat_name as subcategory FROM health.services_master s LEFT JOIN health.business_hours h ON s.service_id = h.id LEFT JOIN health.primary_category pc ON s.primary_cat_id = pc.cat_id LEFT JOIN health.subcategory sc ON pc.cat_id = sc.pc_id WHERE pc.cat_name = "$1" AND sc.subcat_name = "$2"', [action.payload.cat, action.payload.subcat])
        //     .then(data => {
        //         console.log(data);
        //     })
        //     .catch(error => {
        //         // error
        //     });
            
        //     return {
        //         ...state,
        //     }
        default:
            return state;
    }
    
}

export default leftSidebarReducer;