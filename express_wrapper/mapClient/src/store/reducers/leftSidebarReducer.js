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
        tabIndex: 0
    },
    data: [],
}

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

const leftSidebarReducer = (state = initialState, action ) => {//the leftSidebarReducer for redux
//Normally async await func inside reducer
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
            let newData = [];

            let testStr = JSON.stringify({
                cat: state.leftMenu.catDrop,
                subCat: state.leftMenu.subCatDrop,
                insCat: state.leftMenu.insDrop,
                //langCat: state.leftMenu.langDrop,
            });
            return {
                ...state,
                data: newData //---Resets data to [], instead of newdata...---
            }
        case actionTypes.FETCH_DATA_SUCCESS:
            let data = [];
            if (action.data) {
                data = action.data
            }
            return {
                ...state,
                data: data
            }
        case actionTypes.SET_TAB:
            return {
                ...state,
                leftMenu: {
                    ...state.leftMenu,
                    tabIndex: action.index
                },
            }
        default:
            return state;
    }
}

export default leftSidebarReducer;
