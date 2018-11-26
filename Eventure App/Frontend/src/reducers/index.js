import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import LoginReducer from "./loginreducer";
import AddPropertyReducer from "./addpropertyreducer"
import ProfileReducer from "./profilereducer"
import SearchPropertiesReducer from "./searchpropertiesreducer"
import FetchPropertyReducer from "./fetchpropertyreducer"
import MyTripsReducer from "./mytripsreducer"
import OwnerDasboardReducer from "./ownerdashboardreducer"
import SignUpReducer from "./signupreducer";
import MessageReducer from "./messagereducer"

const rootReducer = combineReducers({
  form: formReducer,
  loginreducer: LoginReducer,
  addpropertyreducer : AddPropertyReducer,
  profilereducer : ProfileReducer,
  searchpropertiesreducer : SearchPropertiesReducer,
  fetchpropertyreducer : FetchPropertyReducer,
  mytripsreducer : MyTripsReducer,
  ownerdashboardreducer :  OwnerDasboardReducer,
  signupreducer : SignUpReducer,
  messagereducer : MessageReducer 
});

export default rootReducer;