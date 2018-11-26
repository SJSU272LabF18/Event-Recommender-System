/* import _ from "lodash"; */
import { FETCH_PROPERTY_SUCCESSFUL } from "../actions";

const initialState = {
  fetchFlag : false,
  fetchproperty : []
};

//Reducer listening to different action types
export default function(state = initialState, action) {
  switch (action.type) {
    //target 
    case FETCH_PROPERTY_SUCCESSFUL:
    console.log("fetch reducer")
      return {
        ...state,
        fetchproperty : action.payload,
        fetchFlag : true
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
