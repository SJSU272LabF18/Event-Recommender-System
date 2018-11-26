/* import _ from "lodash"; */
import { SEND_MESSAGE_SUCCESSFUL, GET_MESSAGELIST_SUCCESSFUL, GET_MESSAGETHREAD_SUCCESSFUL,STORE_MESSAGE_SUCCESSFUL } from "../actions";

const initialState = {
  messageFlag : false,
  getmessagethread : '',
  messagelist : '',
  messagestoreFlag: false
};

//Reducer listening to different action types
export default function(state = initialState, action) {
    console.log("!!!!" + action.payload + " " + action.type)
  switch (action.type) {
    //target 
    case SEND_MESSAGE_SUCCESSFUL:
      return {
        ...state,
        messagethread : action.payload,
        messageFlag : true
      }
      case GET_MESSAGELIST_SUCCESSFUL:
      return {
        ...state,
        messagelist : action.payload,
        messagelistFlag : true
      }
      case GET_MESSAGETHREAD_SUCCESSFUL:
      return {
        ...state,
        getmessagethread : action.payload,
        getmessagethreadFlag : true
      }
      case STORE_MESSAGE_SUCCESSFUL:
      return {
        ...state,
        messagestore : action.payload,
        messagestoreFlag : true
      }     
/*       case SEND_MESSAGE_FAILED:
      return {
        ...state,
        messageFlag : action.payload
      } */
    default:
      return state;
  }
}


