import * as actionTypes from '../actions'

const initialState = {
    leftMenu: {
        catDrop: '',
        insDrop: '',
        langDrop: '',
        keyDrop: '',
        subCatDrop: '',
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
        default:
            return state;
    }
    
}

export default leftSidebarReducer;