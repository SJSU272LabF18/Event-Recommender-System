import React from 'react';
import {geolocated} from 'react-geolocated';
 
class Demo extends React.Component {
    constructor(props){
       
        super(props);  
        this.state = {         
            latitude : '',
            longitude : '',
        };
     //   console.log("props",this.props);
    }
componentDidMount(){
    console.log("props",this.props.isGeolocationAvailable)

    navigator.geolocation.getCurrentPosition(position => {
        this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      }, err => console.log(err)
      );
}



  render() {
    console.log("Latitude", (this.props.coords));
    localStorage.setItem("location",(this.state.latitude));
    localStorage.setItem("longitude",(this.state.longitude));
    return (
        <div >
        {/* <h1>Current Position:</h1>
        <p>Latitude: {this.state.latitude}</p>
        <p>Longitude: {this.state.longitude}</p> */}
      </div>
  
    )
    
   
  }
}
 
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 0,
})(Demo);

