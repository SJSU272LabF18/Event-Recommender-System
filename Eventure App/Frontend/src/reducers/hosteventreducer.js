import { EVENT_POST_SUCCESSFUL } from "../actions";

const initialState = {
  eventUpdated : false
};

//Reducer listening to different action types
export default function(state = initialState, action) {
  switch (action.type) {
    //target 
    case EVENT_POST_SUCCESSFUL:
      return {
        ...state,
        event : action.payload,
        eventUpdated : true
      }
/*       case EVENT_POST_FAILED:
      return {
        ...state,
        authFlag : action.payload
      } */
    default:
      return state;
  }
}