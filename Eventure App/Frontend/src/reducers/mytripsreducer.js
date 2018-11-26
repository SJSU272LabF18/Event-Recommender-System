/* import _ from "lodash"; */
import { GET_MYTRIPS_SUCCESSFUL } from "../actions";

const initialState = {
  gettripsFlag : false
};

//Reducer listening to different action types
export default function(state = initialState, action) {
  switch (action.type) {
    //target 
    case GET_MYTRIPS_SUCCESSFUL:
      return {
        ...state,
        mytrips : action.payload,
        gettripsFlag : true
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
