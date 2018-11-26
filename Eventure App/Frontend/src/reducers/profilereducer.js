/* import _ from "lodash"; */
import { PROFILE_POST_SUCCESSFUL } from "../actions";

const initialState = {
  profileUpdated : false
};

//Reducer listening to different action types
export default function(state = initialState, action) {
  switch (action.type) {
    //target 
    case PROFILE_POST_SUCCESSFUL:
      return {
        ...state,
        profile : action.payload,
        profileUpdated : true
      }
/*       case PROFILE_POST_FAILED:
      return {
        ...state,
        authFlag : action.payload
      } */
    default:
      return state;
  }
}
