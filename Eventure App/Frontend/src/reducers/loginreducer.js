/* import _ from "lodash"; */
import { OWNER_LOGIN_SUCCESSFUL, OWNER_LOGIN_FAILED, TRAVELER_LOGIN_SUCCESSFUL, TRAVELER_LOGIN_FAILED } from "../actions";

const initialState = {
  ownerauthFlag : false,
  travelerauthFlag : false
};

//Reducer listening to different action types
export default function(state = initialState, action) {
  console.log(action.type + " " + action.payload)
  switch (action.type) {
    //target 
    case OWNER_LOGIN_SUCCESSFUL:
      return {
        ...state,
        ownerauthFlag : action.payload
      }
      case OWNER_LOGIN_FAILED:
      return {
        ...state,
        ownerauthFlag : action.payload
      }
      case TRAVELER_LOGIN_SUCCESSFUL:
      return {
        ...state,
        travelerauthFlag : action.payload
      }
      case TRAVELER_LOGIN_FAILED:
      return {
        ...state,
        travelerauthFlag : action.payload
      }
    default:
      return state;
  }
}

