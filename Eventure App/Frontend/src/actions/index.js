import axios from 'axios';

export const OWNER_LOGIN_SUCCESSFUL = "owner_login_successful";
export const OWNER_LOGIN_FAILED = "owner_login_failed"
export const PROPERTY_LOCATION_ADD = "property_location_added"
export const PROPERTY_DETAILS_ADD = "property_details_added"
export const PROPERTY_PHOTOS_ADD = "property_photos_added"
export const PROPERTY_AVAILABILITY_ADD = "property_availability_added"
export const PROPERTY_ADDED = "property_added"
export const PROFILE_POST_SUCCESSFUL = "post_profile"
export const  SEARCH_PROPERTY_SUCCESSFUL = "search_property"
export const  STORE_SEARCH_INPUT = "store_search_input"
export const FETCH_PROPERTY_SUCCESSFUL = "fetch_property_successful"
export const PROPERTY_LISTING_SUCCESSFUL = "property_listing_successful"
export const GET_MYTRIPS_SUCCESSFUL = "get_mytrips_successful"
export const GET_OWNERDASHBOARD_SUCCESSFUL = "get_ownerdashboard_successful"
export const TRAVELER_LOGIN_SUCCESSFUL = "TRAVELER_LOGIN_SUCCESSFUL"
export const TRAVELER_LOGIN_FAILED = "TRAVELER_LOGIN_FAILED"
export const OWNER_SIGNUP_SUCCESSFUL =  "OWNER_SIGNUP_SUCCESSFUL"
export const OWNER_SIGNUP_FAILED = "OWNER_SIGNUP_FAILED"
export const TRAVELER_SIGNUP_SUCCESSFUL = "TRAVELER_SIGNUP_SUCCESSFUL"
export const TRAVELER_SIGNUP_FAILED = "TRAVELER_SIGNUP_SUCCESSFUL"
export const SEND_MESSAGE_SUCCESSFUL = "SEND_MESSAGE_SUCCESSFUL"
export const GET_MESSAGELIST_SUCCESSFUL= "GET_MESSAGELIST_SUCCESSFUL"
export const GET_MESSAGETHREAD_SUCCESSFUL = "GET_MESSAGETHREAD_SUCCESSFUL"
export const STORE_MESSAGE_SUCCESSFUL = "STORE_MESSAGE_SUCCESSFUL"
export const EVENT_POST_SUCCESSFUL = "EVENT_POST_SUCCESSFUL"

const ROOT_URL = "http://localhost:3001";

//Owner Login 
export const submitLogin =  (values) =>  async dispatch =>  {
  console.log("inside login action" )
  axios.defaults.withCredentials = true;
    const res = await axios
    .post(`${ROOT_URL}/login`, values)
    /* .then(res  => { */
      console.log( res.status); 
      if(res.status === 200){
      localStorage.setItem('usertoken',res.data.token)
      dispatch({
        type : OWNER_LOGIN_SUCCESSFUL,
        payload: true
      })}else {
        console.log("res" + res);
        dispatch({
          type : OWNER_LOGIN_FAILED,
          payload: false
        })
      }
    /* }) */
}
 
//Traveler Login
export const submitTravelerLogin =  (values) =>  async dispatch =>  {
  console.log("inside login action")
  axios.defaults.withCredentials = true;
    const res = await axios
    .post(`${ROOT_URL}/login`, values)
    /* .then(res  => { */
      console.log( res ); 
      if(res.status === 200){
        localStorage.setItem('usertoken',res.data.token)
      dispatch({
        type : TRAVELER_LOGIN_SUCCESSFUL,
        payload: true
      })}else {
        console.log("res" + res);
        dispatch({
          type : TRAVELER_LOGIN_FAILED,
          payload: false
        })
      }
    /* }) */
}

//Owner Sign up
export const submitOwnerSignUp =  (values) =>  async dispatch =>  {
  console.log("inside owner sign up action")
  axios.defaults.withCredentials = true;
    const res = await axios
    .post(`${ROOT_URL}/signup`, values)
    /* .then(res  => { */
      console.log( res ); 
      if(res.status === 200){
      dispatch({
        type : OWNER_SIGNUP_SUCCESSFUL,
        payload: true
      })}else {
        console.log("res" + res);
        dispatch({
          type : OWNER_SIGNUP_FAILED,
          payload: false
        })
      }
    /* }) */
}

//Traveler Sign Up
export const submitTravelerSignUp =  (values) =>  async dispatch =>  {
  console.log("inside traveler sign up action")
  axios.defaults.withCredentials = true;
    const res = await axios
    .post(`${ROOT_URL}/signup`, values)
    /* .then(res  => { */
      console.log( res.status ); 
      if(res.status === 200){
      dispatch({
        type : TRAVELER_SIGNUP_SUCCESSFUL,
        payload: true
      })}else {
        dispatch({
          type : TRAVELER_SIGNUP_FAILED,
          payload: false
        })
      }
    /* }) */
}



export const submitLocation =  (values) =>  dispatch =>  {
  console.log("inside location action" + values.location)

      dispatch({
        type : PROPERTY_LOCATION_ADD,
        payload: values
      })
}

export const submitDetails =  (values) =>  dispatch =>  {
  console.log("inside submit details action")

      dispatch({
        type : PROPERTY_DETAILS_ADD,
        payload: values
      })
}


export const submitPhotos =  (values) =>  dispatch =>  {
  console.log("inside submit photos action")

      dispatch({
        type : PROPERTY_PHOTOS_ADD,
        payload: values
      })
}

export const submitAvailability =  (values) =>  dispatch =>  {
  console.log("inside submit photos Availiabilty")

      dispatch({
        type : PROPERTY_AVAILABILITY_ADD,
        payload: values
      })
}

export const submitProperty =  (values) =>  async dispatch =>  {
  console.log("inside submit property")
  axios.defaults.withCredentials = true;
  const res = await axios
    .post(`${ROOT_URL}/addProperty`, values)
/*     .then(res  => {
      console.log( res );  */
      if(res.status === 200){
      dispatch({
        type : PROPERTY_ADDED,
        payload: true,

      })}/* else {
        console.log("res" + res);
        dispatch({
          type : PROPERTY_ADD_FAILED,
          payload: false
        })
      } */
    /* }) */
}

export const updateProfile =  (values) => async dispatch =>  {
  console.log("inside submit profile")
  axios.defaults.withCredentials = true;
    const res = await axios
    .post(`${ROOT_URL}/updateprofile`, values)
    /* .then(res  => { */
      console.log("res profile" +  res.status ); 
      console.log(res)
      if(res.status === 200){ 
      dispatch({
        type : PROFILE_POST_SUCCESSFUL,
        payload : res
      })}/* else {
        console.log("res" + res);
        dispatch({
          type : PROFILE_POST_FAILED,
          payload: false
        })
      } */
    //})
}
  

export const searchProperties =  (values) => async dispatch =>  {
  console.log("inside search properties")
  axios.defaults.withCredentials = true;
    const res = await axios
    .post(`${ROOT_URL}/searchproperties`, values)
    /* .then(res  => { */
      console.log("res status" +  res.status ); 
      if(res.status === 200){ 
      dispatch({
        type : SEARCH_PROPERTY_SUCCESSFUL,
        payload : res
      })
      dispatch({
        type : STORE_SEARCH_INPUT,
        payload : values
      })}
      /* else {
        console.log("res" + res);
        dispatch({
          type : PROFILE_POST_FAILED,
          payload: false
        })
      } */
    //})
}



export const fetchpropertydetails =  (values) => async dispatch =>  {
  console.log("inside fetch particular property")
  axios.defaults.withCredentials = true;
    const res = await axios
    .get(`${ROOT_URL}/fetchpropertydetails/`+ values)
    /* .then(res  => { */
      console.log("res status" +  res.status ); 
      if(res.status === 200){ 
      dispatch({
        type : FETCH_PROPERTY_SUCCESSFUL,
        payload : res.data
      })}
      /* else {
        console.log("res" + res);
        dispatch({
          type : FETCH_PROPERTY_FAILED,
          payload: false
        })
      } */
    //})
}

export const travelerpropertydetails =  (values) => async dispatch =>  {
  console.log("inside detailed listing")
  axios.defaults.withCredentials = true;
    const res = await axios
    .post(`${ROOT_URL}/download`, values)
    /* .then(res  => { */
      console.log("res status" +  res.status ); 
      if(res.status === 200){ 
      dispatch({
        type : PROPERTY_LISTING_SUCCESSFUL,
        payload : res
      })
/*       dispatch({
        type : STORE_SEARCH_INPUT,
        payload : values
      }) */}
      /* else {
        console.log("res" + res);
        dispatch({
          type : PROFILE_POST_FAILED,
          payload: false
        })
      } */
    //})
}

//Get my trips
export const getmytrips =  () => async dispatch =>  {
  console.log("Inside get my trips")
  axios.defaults.withCredentials = true;
    const res = await axios
    .get(`${ROOT_URL}/getmytrips`)
    /* .then(res  => { */
      console.log("res status" +  res.status ); 
      if(res.status === 200){ 
      dispatch({
        type : GET_MYTRIPS_SUCCESSFUL,
        payload : res.data
      })}
      /* else {
        console.log("res" + res);
        dispatch({
          type : FETCH_PROPERTY_FAILED,
          payload: false
        })
      } */
    //})
}     


//Get owner dashboard
export const getownerdashboard =  () => async dispatch =>  {
  console.log("Inside getownerdashboard")
  axios.defaults.withCredentials = true;
    const res = await axios
    .get(`${ROOT_URL}/getownerdashboard`)
    /* .then(res  => { */
      console.log("res status" +  res.status ); 
      if(res.status === 200){ 
      dispatch({
        type : GET_OWNERDASHBOARD_SUCCESSFUL,
        payload : res.data
      })}
      /* else {
        console.log("res" + res);
        dispatch({
          type : FETCH_PROPERTY_FAILED,
          payload: false
        })
      } */
    //})
} 

//Send message
export const travelerSendMessage =  (values) => async dispatch =>  {
  console.log("Inside traveler send message")
  axios.defaults.withCredentials = true;
    const res = await axios
    .post(`${ROOT_URL}/sendmessage`, values)
    /* .then(res  => { */
      console.log("res status" +  res.status ); 
      if(res.status === 200){ 
      dispatch({
        type : SEND_MESSAGE_SUCCESSFUL,
        payload : res.data
      })}
      /* else {
        console.log("res" + res);
        dispatch({
          type : SEND_MESSAGE_FAILED,
          payload: false
        })
      } */
    //})
} 

export const fetchmessagelist =  () => async dispatch =>  {
  console.log("Inside traveler send message")
  axios.defaults.withCredentials = true;
    const res = await axios
    .get(`${ROOT_URL}/getmessagelist`)
    /* .then(res  => { */
      console.log("res status" +  res.status ); 
      if(res.status === 200){ 
      dispatch({
        type : GET_MESSAGELIST_SUCCESSFUL,
        payload : res.data
      })}
      /* else {
        console.log("res" + res);
        dispatch({
          type : GET_MESSAGELIST_FAILED,
          payload: false
        })
      } */
    //})
}

export const fetchmessagethreaddetails =  (values) => async dispatch =>  {
  console.log("inside fetch message thread")
  axios.defaults.withCredentials = true;
    const res = await axios
    .get(`${ROOT_URL}/getmessagethread/`+ values)
    /* .then(res  => { */
      console.log("res status" +  res.status ); 
      if(res.status === 200){ 
      dispatch({
        type : GET_MESSAGETHREAD_SUCCESSFUL,
        payload : res.data
      })}
      /* else {
        console.log("res" + res);
        dispatch({
          type : FETCH_PROPERTY_FAILED,
          payload: false
        })
      } */
    //})
}

export const storemessage =  (values) => async dispatch =>  {
  console.log("Inside traveler send message" + values.messagethread)
  axios.defaults.withCredentials = true;
    const res = await axios
    .post(`${ROOT_URL}/sendmessage`, values)
    /* .then(res  => { */
      console.log("res status" +  res.status ); 
      if(res.status === 200){ 
      dispatch({
        type : STORE_MESSAGE_SUCCESSFUL,
        payload : res.data
      })}
      /* else {
        console.log("res" + res);
        dispatch({
          type : SEND_MESSAGE_FAILED,
          payload: false
        })
      } */
    //})
} 

export const postEvent =  (values) => async dispatch =>  {
  console.log("inside submit profile")
  axios.defaults.withCredentials = true;
    const res = await axios
    .post(`${ROOT_URL}/updateevent`, values)
    /* .then(res  => { */
      console.log("res profile" +  res.status ); 
      console.log(res)
      if(res.status === 200){ 
      dispatch({
        type : EVENT_POST_SUCCESSFUL,
        payload : res
      })}/* else {
        console.log("res" + res);
        dispatch({
          type : PROFILE_POST_FAILED,
          payload: false
        })
      } */
    //})
}