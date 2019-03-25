import * as actionTypes from '../actions';

const initialState = {
    rightMenu: {
        rightMenuOpen: false,
        rightHamButton: false,
        cards: [],
        activeCard: -1
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
        case actionTypes.HANDLE_RIGHT:
            return {
                ...state,
                rightMenu: {
                    ...state.rightMenu,
                    rightMenuOpen: state.rightMenu.rightMenuOpen
                },
            }
        case actionTypes.CREATE_RIGHT:
            return {
                ...state,
                rightMenu: {
                    ...state.rightMenu,
                    rightMenuOpen: action.payload,
                    rightHamButton: null
                }
            }
        case actionTypes.DESTROY_RIGHT:
            return {
                ...state,
                rightMenu: {
                    ...state.rightMenu,
                    rightMenuOpen: false,
                    rightHamButton: false,
                }
            }
        case actionTypes.CLOSE_RIGHT:
            return {
                ...state,
                rightMenu: {
                    ...state.rightMenu,
                    rightMenuOpen: false
                }
            }
        case actionTypes.OPEN_RIGHT:
            return {
                ...state,
                rightMenu: {
                    ...state.rightMenu,
                    rightMenuOpen: true
                }
            }
        case actionTypes.ACTIVATE_CARD:
            // var index = -1;
            // for(var i; i<state.rightMenu.cards; i++){
            //     if(state.rightMenu.cards[i].service_id===action.payload){
            //         console.log(index);
            //         index = i;
            //         console.log(i);

            //     }
            // }
            if(action.payload === state.rightMenu.activeCard){
                return {
                    ...state,
                    rightMenu: {
                        ...state.rightMenu,
                        activeCard: -1
                        // ...state.rightMenu.cards[index],
                        // active: true
    
                    }
                }
            }else{
                return {
                    ...state,
                    rightMenu: {
                        ...state.rightMenu,
                        activeCard: action.payload
                        // ...state.rightMenu.cards[index],
                        // active: true
    
                    }
                }
            }
            
        default: 
            return state;
    }
}

export default rightSidebarReducer;