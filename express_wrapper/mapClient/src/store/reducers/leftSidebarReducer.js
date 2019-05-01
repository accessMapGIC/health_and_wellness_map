import * as actionTypes from '../actions' //imports the different redux actions described in the actions.js file

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
    data: [{ //initial sample data that should be overwritten so we don't get an undefined error
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

const leftSidebarReducer = (state = initialState, action ) => {//the leftSidebarReducer for redux
    async function categoryQuery(json){//this is an asycronous function for the categoryQuery that gets called below
        await fetch('/category_query', { //Axios.post instead of fetch if we want.
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: json //uses testStr of input values (below)
        })
        .then(function(response){
            //console.log(response.json()); //returns data array meeting query values.
            return response.json();
        })
        .catch(err => console.log(err));
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
            let newdata = [];

            let testStr = JSON.stringify({
                cat: state.leftMenu.catDrop,
                subCat: state.leftMenu.subCatDrop,
                insCat: state.leftMenu.insDrop,
                //langCat: state.leftMenu.langDrop,
            });
            categoryQuery(testStr)
            //console.log(categoryQuery(testStr)); resloved, undefined value...
            return {
                ...state,
                data: newdata
            }
        default:
            return state;
    }

}

export default leftSidebarReducer;
