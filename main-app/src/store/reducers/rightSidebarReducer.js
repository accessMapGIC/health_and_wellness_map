import * as actionTypes from '../actions';

const initialState = {
    rightMenu: {
        card: [],
    }
}

const rightSidebarReducer = (state = initialState, action ) => {
    switch ( action.type ){
        case actionTypes.ADD_CARD:
            const newState = Object.assign({}, state);
            // console.log(newState);
            newState.rightMenu.card[action.payload.key] = {
                title: action.payload.title,
                address: action.payload.address
            };
            // console.log(newState);
            return newState;

        default: 
            return state;
    }
}

export default rightSidebarReducer;