import * as actionTypes from '../actions';

const initialState = {
    data: [{
        "hours": [
            [
                "NA",
                "NA"
            ],
            [
                "08:00",
                "17:00"
            ],
            [
                "08:00",
                "17:00"
            ],
            [
                "08:00",
                "20:00"
            ],
            [
                "09:00",
                "17:00"
            ],
            [
                "09:00",
                "17:00"
            ],
            [
                "NA",
                "NA"
            ]
        ],
        "service_id": 2,
        "name": "Clinique Communautaire de Pointe Sant-Charles",
        "phone": "514-937-9251",
        "address": "1955 rue du Centre",
        "x":45.48238,
        "y":-73.56348,
        "url":"https://ccpsc.qc.ca"
    
    }
    ],
}

const dbReducer = (state = initialState, action ) => {
    async function categoryQuery(){
        try {
            const response = await fetch('/category_query');
            const body = await response.json();
            console.log(body);
            if (response.status !== 200) {
                throw Error(body.message) 
            }
            return body;
        } catch (err){
        console.error(err);
        }
    }
    
    switch ( action.type ){
        case actionTypes.QUERY_DATABASE:
            const newState = Object.assign({}, state);
            categoryQuery()
            .then(res => newState.data = res)
            .catch(err => console.log(err));
            
            return newState;
        default: 
            return state;
    }
}


export default dbReducer;