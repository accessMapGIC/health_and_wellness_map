import * as actionTypes from '../actions';

const initialState = {
    rightMenu: {
        card: {

        }
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
            return{
                ...state,
                rightMenu: {
                    ...state.rightMenu,
                    card: {
                        ...state.rightMenu.card,
                        [action.meta.key]: {
                            title: action.payload.title,
                            address: action.payload.address,
                            x: action.payload.x,
                            y: action.payload.y,
                            service_id: action.payload.service_id
                        }
                    }
                }
            }
        default: 
            return state;
    }
}

export default rightSidebarReducer;