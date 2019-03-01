import * as actionTypes from '../actions';

const initialState = {
    rightMenu: {
        numCards: 0,
        Cards: []
    }
}

const rightSidebarReducer = (state = initialState, action ) => {
    switch ( action.type ){
        case( actionTypes.ON_NEW_QUERY ):
            return initialState;

        default: 
            return state;
    }
}

export default rightSidebarReducer;