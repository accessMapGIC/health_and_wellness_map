import * as actionTypes from '../actions';

const initialState = {
    points: [],
    point: undefined,
    zoom: [16],
    center: [-73.578520, 45.505642],//[-73.5731, 45.501],
    bearing: [-55],
    userCoords: [],
}

// function startGeoLocation() {
//     observerID = navigator.geolocation.watchPosition(onSuccess, onError, {
//         maximunAge: 60000,
//         enableHighAccuracy: true,
//         timeout: 20000
//     });
// }

// function stopGeolocation() {

//     if (observerID !== -1) {
//         navigator.geolocation.clearWatch(observerID);
//         observerID = -1;

//     }
// }
//potential functions for the geolocation function for a custom button



const mapboxReducer = (state = initialState, action ) => {
    switch ( action.type ){
        case actionTypes.ADD_POINT:
            if (state.points.find(c => c.service_id === action.payload.id)) {
                return state;
            }
            const newPoint = {
                lat: action.payload.lat,
                lng: action.payload.lng,
                id: action.payload.id,
                title: action.payload.title,
                address: action.payload.address,
                ref: action.payload.ref,
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
                    ref: action.payload.ref,
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
                        ref: state.points[i].ref,
                    }
                }
            }
            return {
                ...state,
                center: newCenter,
                zoom: [14],
                point: point,
            }
        default: 
            return state;
    }
}

export default mapboxReducer;