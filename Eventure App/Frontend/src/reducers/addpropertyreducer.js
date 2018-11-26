/* import _ from "lodash"; */
import { PROPERTY_LOCATION_ADD, 
  PROPERTY_DETAILS_ADD, 
  PROPERTY_PHOTOS_ADD,
  PROPERTY_AVAILABILITY_ADD,
  PROPERTY_ADDED } from "../actions";

const initialState = {
    location : 'location',
    details : '',
    photos : '',
    availability : '',
    property : ''

};

//Reducer listening to different action types
//initial state is {}
export default function(state = initialState, action) {
  switch (action.type) {
    //target 
    case PROPERTY_LOCATION_ADD:
      return {
        ...state,
        location : action.payload,
        locationAdded : true
      }
      case PROPERTY_DETAILS_ADD:
      return {
        ...state,
        details : action.payload,
        detailsAdded : true
      }
      case PROPERTY_PHOTOS_ADD:
      return {
        ...state,
        photos : action.payload,
        photosAdded : true
      }
      case PROPERTY_AVAILABILITY_ADD:
      return {
        ...state,
        availability : action.payload,
        availabilityAdded : true
      }
      case PROPERTY_ADDED:
      return {
        ...state,
        property : action.payload,
        propertyAdded : true
      }
    default:
      return state;
  }
}
