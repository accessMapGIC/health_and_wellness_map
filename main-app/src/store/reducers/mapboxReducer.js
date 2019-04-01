import * as actionTypes from '../actions';

const initialState = {
    points: [],
    point: undefined,
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
                address: action.payload.address,
            }
            const newState = Object.assign({}, state);
            newState.points.push(newPoint);
            return newState;
        case actionTypes.CENTER_ON_POINT:
            return {
                ...state,
                center: action.payload.center,
                zoom: [14],
                point: {
                    lng: action.payload.center[0],
                    lat: action.payload.center[1],
                    id: action.payload.id,
                    title: action.payload.title,
                    address: action.payload.address,
                }
            }
        case actionTypes.ACTIVATE_POINT:
            var newCenter = [];
            var point = {};
            for(var i = 0; i<state.points.length; i++){
                if(state.points[i].id === action.payload){
                    newCenter = [state.points[i].lng, state.points[i].lat];
                    point = {
                        lng: state.points[i].lng, 
                        lat: state.points[i].lat,
                        id: state.points[i].id,
                        title: state.points[i].title,
                        address: state.points[i].address,
                    }
                }
            }
            return {
                ...state,
                center: newCenter,
                zoom: [14],
                point: point,
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
        default: 
            return state;
    }
}

export default mapboxReducer;