/* import _ from "lodash"; */
import { OWNER_SIGNUP_SUCCESSFUL, OWNER_SIGNUP_FAILED, TRAVELER_SIGNUP_SUCCESSFUL, TRAVELER_SIGNUP_FAILED } from "../actions";

const initialState = {
  ownersignUpFlag : false,
  travelersignUpFlag : false
};

//Reducer listening to different action types
export default function(state = initialState, action) {
/*   console.log(action.type + " " + action.payload) */
  switch (action.type) {
    //target 
    case OWNER_SIGNUP_SUCCESSFUL:
      return {
        ...state,
        ownersignUpFlag : action.payload
      }
      case OWNER_SIGNUP_FAILED:
      return {
        ...state,
        ownersignUpFlag : action.payload
      }
      case TRAVELER_SIGNUP_SUCCESSFUL:
        return {
          ...state,
          travelersignUpFlag : action.payload
        }
        case TRAVELER_SIGNUP_FAILED:
        console.log("reducer" + action.payload)
        return {
          ...state,
          travelersignUpFlag : action.payload
        }
    default:
      return state;
  }
}

