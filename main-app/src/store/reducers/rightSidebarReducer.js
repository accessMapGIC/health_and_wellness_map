import * as actionTypes from '../actions';

const initialState = {
    rightMenu: {
    }
}

const rightSidebarReducer = (state = initialState, action ) => {
    switch ( action.type ){
        case( actionTypes.ON_NEW_QUERY ):
            return state;

        default: 
            return state;
    }
}

export default rightSidebarReducer;