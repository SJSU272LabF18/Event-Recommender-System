/* import _ from "lodash"; */
import { SEARCH_PROPERTY_SUCCESSFUL, STORE_SEARCH_INPUT } from "../actions";

const initialState = {
  searchFlag : false
};

//Reducer listening to different action types
export default function(state = initialState, action) {
  switch (action.type) {
    //target 
    case SEARCH_PROPERTY_SUCCESSFUL:
      return {
        ...state,
        searchresults : action.payload,
        searchFlag : true
      }
      case STORE_SEARCH_INPUT:
      return {
        ...state,
        searchinput : action.payload,
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
