import * as actionTypes from '../actions';

const initialState = {
    rightMenu: {
        cards: []
    }
}

const rightSidebarReducer = (state = initialState, action ) => {
    switch ( action.type ){
        case actionTypes.ADD_CARD:
            // const newState = Object.assign({}, state);
            // // console.log(newState);
            // newState.rightMenu.card = {
            //     title: action.payload.title,
            //     address: action.payload.address,
            //     x: action.payload.x,
            //     y: action.payload.y,

            // };
            const newCard = {
                title: action.payload.title,
                address: action.payload.address,
                x: action.payload.x,
                y: action.payload.y,
                service_id: action.payload.service_id,
                active: action.payload.active
            }
            const newState = Object.assign({}, state);
            newState.rightMenu.cards.push(newCard);
            return newState;
        default: 
            return state;
    }
}

export default rightSidebarReducer;