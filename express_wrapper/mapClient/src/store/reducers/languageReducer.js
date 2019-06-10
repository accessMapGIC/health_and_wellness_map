import * as actionTypes from '../actions';

const initialState = {
    language: "en"
}

const languageReducer = (state = initialState, action ) => {
    switch ( action.type ){
        case actionTypes.CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.language
            };
        default: 
            return state;
    }
}

export default languageReducer;