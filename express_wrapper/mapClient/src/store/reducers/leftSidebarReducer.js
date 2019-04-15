import * as actionTypes from '../actions'
// import db from '../db';

const initialState = {
    leftMenu: {
        leftMenuOpen: false,
        leftHamButton: null,
        catDrop: '',
        insDrop: '',
        langDrop: '',
        keyDrop: '',
        subCatDrop: '',
        openNow: false,
    },
    data: [{
        "hours": [
            [
                "NA",
                "NA"
            ],
            [
                "08:00",
                "17:00"
            ],
            [
                "08:00",
                "17:00"
            ],
            [
                "08:00",
                "20:00"
            ],
            [
                "09:00",
                "17:00"
            ],
            [
                "09:00",
                "17:00"
            ],
            [
                "NA",
                "NA"
            ]
        ],
        "service_id": 2,
        "name": "Clinique Communautaire de Pointe Sant-Charles",
        "phone": "514-937-9251",
        "address": "1955 rue du Centre",
        "x":45.48238,
        "y":-73.56348,
        "url":"https://ccpsc.qc.ca"
    
    }
    ],
}

const leftSidebarReducer = (state = initialState, action ) => {
    async function categoryQuery(json){
        await fetch('/category_query', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: json,
        })
        .then(function(response){
            return response.json();
        })
        .catch(info => console.log(info));
    }

    switch ( action.type ){
        case actionTypes.CATEGORY_CHANGE:
            const newState = Object.assign({}, state);
            newState.leftMenu.catDrop = action.payload;
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
        case actionTypes.HANDLE_LEFT:
            return {
                ...state,
                leftMenu: {
                    ...state.leftMenu,
                    leftMenuOpen: state.leftMenu.leftMenuOpen
                },
            }
        case actionTypes.CREATE_LEFT:
            return {
                ...state,
                leftMenu: {
                    ...state.leftMenu,
                    leftMenuOpen: action.payload,
                    leftHamButton: null
                }
            }
        case actionTypes.DESTROY_LEFT:
            return {
                ...state,
                leftMenu: {
                    ...state.leftMenu,
                    leftMenuOpen: false,
                    leftHamButton: false,
                }
            }
        case actionTypes.QUERY_DATABASE:
            var newdata = [];
            
            var testStr = JSON.stringify({
                cat: state.leftMenu.catDrop,
                subCat: state.leftMenu.subCatDrop,
                insCat: state.leftMenu.insDrop,
                langCat: state.leftMenu.langDrop,
            });
            categoryQuery(testStr)
            return {
                ...state,
                data: newdata,
            }
        default:
            return state;
    }
    
}

export default leftSidebarReducer;