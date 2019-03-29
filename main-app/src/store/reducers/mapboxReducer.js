import * as actionTypes from '../actions';

const initialState = {
    points: [],
    point: {},
    zoom: [16],
    center: [-73.578520, 45.505642],//[-73.5731, 45.501],
    bearing: [-55],
    userCoords: [],
}

const mapboxReducer = (state = initialState, action ) => {
    switch ( action.type ){
        case actionTypes.ADD_POINT:
            const newPoint = {
                lat: action.payload.lat,
                lng: action.payload.lng,
                id: action.payload.id,
                title: action.payload.title,
            }
            const newState = Object.assign({}, state);
            newState.points.push(newPoint);
            return newState;
        case actionTypes.CENTER_ON_POINT:
            return {
                ...state,
                center: action.payload.center,
                zoom: [14],
            }
        case actionTypes.ACTIVATE_POINT:
            var newCenter = [];
            for(var i = 0; i<state.points.length; i++){
                if(state.points[i].id === action.payload){
                    newCenter = [state.points[i].lng, state.points[i].lat];
                }
            }
            return {
                ...state,
                center: newCenter,
            }
        case actionTypes.CENTER_ON_USER:
            // navigator.geolocation.getCurrentPosition((position) => {
            //     console.log(position);
            //     const center=[position.coords.longitude, position.coords.latitude];
            //     return center;
            // })
            return {
                ...state,
                // center: center,
            }
        case actionTypes.CLOSE_RIGHT:
            return {
                ...state,
            }
        case actionTypes.OPEN_RIGHT:
            return {
                ...state,
            } 
        default: 
            return state;
    }
}

export default mapboxReducer;