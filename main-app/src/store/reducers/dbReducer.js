import * as actionTypes from '../actions';
import db from '../db';

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
        case actionTypes.QUERY_DATABASE:

            db.task('my-task', function * (t) {
                // t.ctx = task context object
        
                const user = yield t.one('SELECT id FROM Users WHERE name = $1', 'John');
                return yield t.any('SELECT * FROM Events WHERE userId = $1', user.id);
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                // error
            });
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
        default: 
            return state;
    }
}

export default mapboxReducer;