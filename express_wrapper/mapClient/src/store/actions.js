//the collection of actions for the redux store
const base_url =  "http://gic.geog.mcgill.ca:5001";
export const CATEGORY_CHANGE = 'CATEGORY_CHANGE';
export const SUBCATEGORY_CHANGE = 'SUBCATEGORY_CHANGE';
export const INSURANCE_CHANGE = 'INSURANCE_CHANGE';
export const KEYWORD_CHANGE = 'KEYWORD_CHANGE';
export const LANGUAGE_CHANGE = 'LANGUAGE_CHANGE';
export const ON_IS_OPEN_CHANGE = 'ON_IS_OPEN_CHANGE';
export const ON_SUBMIT = 'ON_SUBMIT';
export const ON_NEW_QUERY = 'ON_NEW_QUERY';
export const ADD_CARD = 'ADD_CARD';
export const ACTIVATE_CARD = 'ACTIVATE_CARD';
export const HANDLE_LEFT = 'HANDLE_LEFT';
export const CREATE_LEFT = 'CREATE_LEFT';
export const DESTROY_LEFT = 'DESTROY_LEFT';
export const CLOSE_RIGHT = 'CLOSE_RIGHT';
export const HANDLE_RIGHT = 'HANDLE_RIGHT';
export const CREATE_RIGHT = 'CREATE_RIGHT';
export const DESTROY_RIGHT = 'DESTROY_RIGHT';
export const OPEN_RIGHT = 'OPEN_RIGHT';
export const ADD_POINT = 'ADD_POINT';
export const CENTER_ON_POINT = 'CENTER_ON_POINT';
export const ACTIVATE_POINT = 'ACTIVATE_POINT';
export const CENTER_ON_USER = 'CENTER_ON_USER';
export const QUERY_DATABASE = 'QUERY_DATABASE'; //initial Ryan query
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const SET_TAB = 'SET_TAB';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
// export const START_QUERY_DATABASE = 'START_QUERY_DATABASE'; //Need Action like this for async action

export function setTabIndex(index) {
  return {
    type: SET_TAB,
    index
  };
}

export function fetchDataSuccess(data) {
  return {
    type: FETCH_DATA_SUCCESS,
    data
  };
}

export function keywordsQuery(json) {
  // redux-thunk middleware
  return async dispatch => {
    await fetch(`${base_url}/keywords_query`, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
      },
      body: json ? JSON.stringify(json) : "{}"
    })
    .then(function(response) {
      return response.json();
    })
    .then(data => {
      dispatch(fetchDataSuccess(data));
      data.forEach(card => {
        dispatch({
          type: ADD_CARD,
          payload: {
            title: card.title,
            address: card.address,
            service_id: card.service_id,
            x: card.x,
            y: card.y,
          }
        });
        dispatch({
          type: ADD_POINT,
          payload: {
            lng: card.y,
            lat: card.x,
            id: card.service_id,
            title: card.title,
            address: card.address,
          }
        });
      });
    })
    .catch(err => console.log(err));
  };
}

export function categoryQuery(json) {
  // redux-thunk middleware
  return async dispatch => {
    await fetch(`${base_url}/category_query`, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
      },
      body: json ? JSON.stringify(json) : "{}"
    })
    .then(function(response) {
      return response.json();
    })
    .then(data => {
      dispatch(fetchDataSuccess(data));
      data.forEach(card => {
        dispatch({
          type: ADD_CARD,
          payload: {
            title: card.title,
            address: card.address,
            service_id: card.service_id,
            x: card.x,
            y: card.y,
          }
        });
        dispatch({
          type: ADD_POINT,
          payload: {
            lng: card.y,
            lat: card.x,
            id: card.service_id,
            title: card.title,
            address: card.address,
          }
        });
      });
    })
    .catch(err => console.log(err));
  };
}

export function setLanguage(language) {
  return {
    type: CHANGE_LANGUAGE,
    language
  };
}
