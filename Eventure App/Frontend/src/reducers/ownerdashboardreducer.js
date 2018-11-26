/* import _ from "lodash"; */
import { GET_OWNERDASHBOARD_SUCCESSFUL } from "../actions";

const initialState = {
  bookingsFlag : false
};

//Reducer listening to different action types
export default function(state = initialState, action) {
  switch (action.type) {
    //target 
    case GET_OWNERDASHBOARD_SUCCESSFUL:
      return {
        ...state,
        bookings : action.payload,
        bookingsFlag : true
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
