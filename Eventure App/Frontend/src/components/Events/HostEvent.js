import React, { Component } from "react";
import NavBarBlue from "../NavBarBlue/NavBarBlue";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { postEvent } from "../../actions";
import swal from "sweetalert";
import jwtdecode from "jwt-decode";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData
} from "react-country-region-selector";
import "./HostEvent.css";

//create the Landing Component
class HostEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: [],
      eventname: null,
      eventdescription: null,
      eventdate: null,
      starttime: null,
      eventduration: null,
      eventvenue: null,
      eventcitystate: null,
      // eventstate : null,
      eventzip: null,
      eventcountry: null,
      eventflag: false,
      count: "",
      images: ""
    };
  }
  //get the profile data from backend
  componentDidMount() {
    axios.defaults.withCredentials = true;
    axios.get("http://52.9.107.69:3001/getprofile/").then((response, err) => {
      console.log("Profile Data: " + JSON.stringify(response.data));
      this.setState({
        eventData: this.state.eventData.concat(response.data)
      });

      this.state.eventData.map(event => {
        this.setState({
          eventname: event.eventname,
          eventdescription: event.eventdescription,
          eventdate: event.eventdate,
          starttime: event.starttime,
          eventduration: event.duration,
          eventvenue: event.eventvenue,
          eventcitystate: event.eventcitystate,
          // eventstate : event.eventstate,
          eventzip: event.eventzip,
          eventcountry: event.eventcountry,
          images: event.images
        });
      });
    });
  }

  handleEventName = e => {
    this.setState({
      eventname: e.target.value
    });
  };

  handleEventDescription = e => {
    this.setState({
      eventdescription: e.target.value
    });
  };

  handleEventDate = e => {
    this.setState({
      eventdate: e.target.value
    });
  };

  handleStartTime = e => {
    this.setState({
      starttime: e.target.value
    });
  };

  handleEventDuration = e => {
    this.setState({
      eventduration: e.target.value
    });
  };

  handleEventVenue = e => {
    this.setState({
      eventvenue: e.target.value
    });
  };
  handleEventCityState = e => {
    this.setState({
      eventcitystate: e.target.value
    });
  };
  // handleEventState = (e) => {
  //     this.setState({
  //         eventstate : e.target.value
  //     })
  // }
  handleEventZip = e => {
    this.setState({
      eventzip: e.target.value
    });
  };
  handleEventCountry = e => {
    this.setState({
      eventcountry: e.target.value
    });
  };

  onChange = e => {
    console.log("Inside onchange");
    console.log(e.target.files);
    if (e.target.name == "selectedFile") {
      this.setState({
        selectedFile: e.target.files
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

  handleCreateEvent = async e => {
    const { description, selectedFile } = this.state;
    let formData = new FormData();
    formData.append("description", description);
    for (let i = 0; i < Object.keys(this.state.selectedFile).length; i++) {
      formData.append("selectedFile", selectedFile[i]);
    }

    await axios
      .post("http://52.9.107.69:3001/photos", formData)
      .then(result => {
        if (result.status === 200) {
          this.setState({
            eventflag: true,
            images: result.data //name of file
          });
        }
      });
    console.log("images" + this.state.images);
    var values = {
      eventname: this.state.eventname,
      eventdescription: this.state.eventdescription,
      eventdate: this.state.eventdate,
      starttime: this.state.starttime,
      eventduration: this.state.eventduration,
      eventvenue: this.state.eventvenue,
      eventcitystate: this.state.eventcitystate,
      // eventstate : this.state.eventstate,
      eventzip: this.state.eventzip,
      eventcountry: this.state.eventcountry,
      images: this.state.images
    };

    this.props.postEvent(values);
  };

  handlePredictCount = async e => {
    // Without "this"
    var i;
    for (i = 0; i < 4000; i++) {
      console.log("");
    }
    await axios.get("http://52.9.107.69:3001/getcount").then(response => {
      if (response.status == 200) {
        this.setState({
          searched: true,
          count: response.data[0].count
        });
        console.log(this.state.count);
        if (this.state.count) {
          swal("", "Current predicted count:" + this.state.count, "success");
        } else {
          swal("Oops!Something went wrong", "", "error");
        }
      } else {
        this.setState({
          searched: false
        });
      }
    });
  };

  render() {
    let redirectVar = null;
    // if(this.state.usertype === "traveler"){
    //   redirectVar = <Link to="/travelerinboxlistings">Inbox</Link>
    // }
    // else if (this.state.usertype === "owner")
    // {
    //   redirectVar = <Link to="/ownerinboxlistings">Inbox</Link>
    // }
    const { description, selectedFile } = this.state;

    let EventDetails = this.state.eventData.map(event => {
      return (
        <form>
          <div className="host-form-inner">
            <h3>Host New Event</h3>

            <div>
              <input
                type="text"
                onChange={this.handleEventName}
                class="form-control input-lg js-input-field"
                id="hostEventName"
                placeholder="Event Name"
                value={this.state.eventname}
              />
            </div>
            <div>
              <textarea
                onChange={this.handleEventDescription}
                class="form-control input-lg js-input-field"
                id="hostEventDescription"
                placeholder="Event Description"
                value={this.state.eventdescription}
                rows="4"
                required=""
              />
            </div>

            <div>
              <input
                type="date"
                onChange={this.handleEventDate}
                class="form-control input-lg js-input-field"
                id="hostEventDate"
                placeholder="Event Date"
                value={this.state.eventdate}
              />
            </div>

            <div>
              <input
                type="time"
                onChange={this.handleStartTime}
                class="form-control input-lg js-input-field"
                id="hostStartTime"
                placeholder="Event Start time"
                value={this.state.starttime}
              />
            </div>

            <div>
              <input
                type="text"
                onChange={this.handleEventDuration}
                class="form-control input-lg js-input-field"
                id="hostEventDuration"
                placeholder="Event Duration"
                value={this.state.eventduration}
              />
            </div>
            <div className="profile-form-inner" />
            <h3>Venue Details</h3>

            {/* <div>
                    <input type="text" onChange = {this.handleEventVenue} class="form-control input-lg js-input-field" id="eventVenue" placeholder="Venue Details" value={this.state.eventvenue}></input>
                </div> */}
            <div>
              <input
                type="text"
                onChange={this.handleEventCityState}
                class="form-control input-lg js-input-field"
                id="eventCityState"
                placeholder="City,State"
                value={this.state.eventcitystate}
              />
            </div>
            {/* <div>
                    <input type="text" onChange = {this.handleEventState} class="form-control input-lg js-input-field" id="eventState" placeholder="State" value={this.state.eventstate}></input>
                </div> */}
            <div>
              <input
                type="text"
                onChange={this.handleEventZip}
                class="form-control input-lg js-input-field"
                id="eventZip"
                placeholder="Zip code"
                value={this.state.eventzip}
              />
            </div>

            <div>
              <input
                type="text"
                onChange={this.handleEventCountry}
                class="form-control input-lg js-input-field"
                id="eventCountry"
                placeholder="Country"
                value={this.state.eventcountry}
              />
            </div>

            <div class="photos-drop-inside">
              <h2 class="photo-drop-title text-muted">Drop photos here</h2>
              <h2 class="photo-drop-OR text-muted">or</h2>

              <div>
                <label
                  for="uploadPhotoInput"
                  name="description"
                  value={description}
                  onChange={this.onChange}
                  multiple
                  class="photo-drop-button btn btn-default center-block"
                >
                  Select Photos to Upload
                </label>
                <input
                  type="file"
                  id="uploadPhotoInput"
                  multiple
                  name="selectedFile"
                  onChange={this.onChange}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={this.handlePredictCount}
              class="btn btn-primary btn-md searchbox-submit save-btn"
              type="button"
              tabindex="5"
            >
              Predict Attendees
            </button>
            <button
              onClick={this.handleCreateEvent}
              class="btn btn-primary btn-md searchbox-submit save-btn"
              type="button"
              tabindex="5"
            >
              Create Event
            </button>
          </div>
        </form>
      );
    });
    //if not logged in go to login page
    /*         let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/travelerlogin"/>
        } */

    return (
      <div>
        <NavBarBlue />

        <div className="profile-form-main">{EventDetails}</div>
      </div>
    );
  }
}

// const mapStateToProps = state =>{
//     console.log("mstp" + state.eventreducer.eventUpdated);
//     return {
//         eventUpdated : state.eventreducer.eventUpdated
//     }
// }

export default connect(
  null,
  { postEvent }
)(HostEvent);
