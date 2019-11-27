import  actionConstants  from '../actionConstants';
import { authInitialState } from './initialState';

export default function auth(state = authInitialState, action) {
  switch (action.type) {
    //Sign out
    case actionConstants.SIGN_OUT_REQUEST:
      return {
        ...state,
        loadingSignOut: true,
        authMessage: actionConstants.SIGN_OUT_REQUEST
      };
    case actionConstants.SIGN_OUT_SUCCESS:
      return {
        ...state,
        authMessage: actionConstants.SIGN_OUT_SUCCESS
      };
    case actionConstants.SIGN_OUT_FAILURE:
      return {
        ...state,
        loadingSignOut: false,
        authMessage: action.error
      };
    
    //Sign in
    case actionConstants.SIGN_IN_REQUEST:
      return {
          ...state,
          loadingSignIn: true,
          authMessage: actionConstants.SIGN_IN_REQUEST
      }
    case actionConstants.SIGN_IN_SUCCESS:
      return {
          ...state,
          loggedin: true,
          authError:'',
          authMessage: actionConstants.SIGN_IN_SUCCESS,
          loadingSignIn: false,
          loggedInUser: action.payload.email,
      }
    case actionConstants.SIGN_IN_FAILURE:
      return {
          ...state,
          authError: action.error,
          authMessage: actionConstants.SIGN_IN_FAILURE,
          loadingSignIn: false,
          loggedin: false

      }

      //Get authentication state
    case actionConstants.GET_AUTH_REQUEST:
      return {
        ...state,
        authMessage: actionConstants.GET_AUTH_REQUEST
    }
    case actionConstants.GET_AUTH_SUCCESS:
      return {
        ...state,
        authError:'',
        authMessage: actionConstants.GET_AUTH_SUCCESS,
        loggedInUser: action.payload,
        loggedin: true
    }
    case actionConstants.GET_AUTH_FAILURE:
      return {
        ...state,
        authMessage: actionConstants.GET_AUTH_FAILURE,
        authError: action.error
    }

    default:
      return state;
  }
}
