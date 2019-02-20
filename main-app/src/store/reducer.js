// import { combineReducers } from "redux";

const initialState = {
    leftMenu: {
        leftMenuOpen: false,
        leftHamButton: null,
      },
    rightMenu: {
        rightMenuOpen: false,
        rightHamButton: false,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case 'MENU_CHANGE': {
            if (action.menu_val === 0) {
                const newState = Object.assign({}, state);
                newState.leftMenu.leftMenuOpen = !state.leftMenu.leftMenuOpen;
                return newState;
            }
            if (action.menu_val === 1) {
                const newState = Object.assign({}, state);
                newState.rightMenu.rightMenuOpen = !state.rightMenu.rightMenuOpen;
                return newState;
            }
        }

        case 'SUBMIT': {
            const newState = Object.assign({}, state);
            newState.leftMenu.leftMenuOpen = false;
            newState.leftMenu.leftHamButton = false;
            newState.rightMenu.rightMenuOpen = !state.rightMenu.rightMenuOpen;
            newState.rightMenu.rightHamButton = null;
        }

        case 'NEW_SUBMIT': {
            const newState = Object.assign({}, state);
            newState.leftMenu.leftMenuOpen = !state.leftMenu.leftMenuOpen;
            newState.leftMenu.leftHamButton = null;
            newState.rightMenu.rightMenuOpen = false;
            newState.rightMenu.rightHamButton = false;
        }
        
        default:
            return state
    }
}


// const reducers = {
//     // the other reducers go here
//     burgerMenu //must be mounted as burgerMenu
// };

// const reducer = combineReducers(reducers);

export default reducer;