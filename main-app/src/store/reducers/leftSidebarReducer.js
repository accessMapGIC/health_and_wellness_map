import * as actionTypes from '../actions'

const initialState = {
    leftMenu: {
        catDrop: 'Choose a Category',
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
            newState.catDrop = action.cat;
            console.log(newState);
            return newState;
        // case actionTypes.SUBCATEGORY_CHANGE:
        //     const newState = Object.assign({}, state);
        //     newState.catDrop = action.subCat;
        //     return newState;
        // case actionTypes.INSURANCE_CHANGE:
        //     const newState = Object.assign({}, state);
        //     newState.catDrop = action.ins;
        //     return newState;
        // case actionTypes.KEYWORD_CHANGE:
        //     const newState = Object.assign({}, state);
        //     newState.catDrop = action.key;
        //     return newState;
        // case actionTypes.LANGUAGE_CHANGE:
        //     const newState = Object.assign({}, state);
        //     newState.catDrop = action.lang;
        //     return newState;
        default:
            return state;
    }
}

export default leftSidebarReducer;