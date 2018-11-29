import React, { Component } from "react";
import NavBarBlue from "../NavBarBlue/NavBarBlue";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { travelerpropertydetails } from "../../actions";
import { travelerSendMessage } from "../../actions";
import swal from "sweetalert";
import jwtdecode from "jwt-decode";
import { values } from "redux-form";
import "./TravelerPropertyDetails.css";

//create the sidebar Component
class TravelerPropertyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyData: [],
      //  : [],
      message: []
    };
  }

  // componentWillReceiveProps(nextProps) {
  //         console.log(" Fetch flag" + nextProps.fetchFlag);

  //             var photoList = nextProps.propertyData[0].picturelist.split(',');

  //             var imageArr = [];
  //             for (let i = 0; i < photoList.length; i++) {
  //               axios.post('http://52.9.107.69:3001/download/' + photoList[i])
  //                   .then(response => {
  //                       //console.log("Image Res : ", response);
  //                       let imagePreview = 'data:image/jpg;base64, ' + response.data;
  //                        imageArr.push(imagePreview);
  //                      /*  const propertyArr = this.state.Properties.slice();
  //                       propertyArr[i].Photos = imagePreview; */
  //                       this.setState({
  //                           /* Properties: propertyArr, */
  //                          : imageArr
  //                       });
  //                   });
  //           }
  //         /* }  */

  //       }

  componentWillMount() {
    console.log("Token in did mount" + localStorage.getItem("usertoken"));
    if (localStorage.getItem("usertoken")) {
      var tokenvalue = jwtdecode(localStorage.getItem("usertoken"));
      console.log("decoded  " + tokenvalue);
      this.setState({
        token: true,
        username: tokenvalue.user.firstname
      });
    }
  }

  componentDidMount() {
    /* axios.get('http://52.9.107.69:3001/fetchpropertydetails/'+pid)
        .then(response => {
            if(response.status == 200){ */
    /*       this.setState({
                    propertyData : this.state.propertyData.concat(this.props.propertydata),
                }) */
    /*                 this.state.propertyData.map(property => { 
                    this.setState(
                        {
                            pid : property.pid,
                            start_date : property.availablestartdate,
                            end_date : property.availableenddate,
                            accomodates : property.accomodates,
                            oemailid : property.oemailid ,
                            picturelist : property.picturelist                 
                        }
                    );

                    
                }) */
    /*                console.log("prop data in cdm" + this.props.propertyData);
                 console.log("piclist " + this.props.propertyData[0].picturelist.split(',')); */
    //     var photoList = this.props.propertyData[0].picturelist.split(',');
    //     var imageArr = [];
    //     for (let i = 0; i < photoList.length; i++) {
    //       axios.post('http://52.9.107.69:3001/download/' + photoList[i])
    //           .then(response => {
    //               //console.log("Imgae Res : ", response);
    //               let imagePreview = 'data:image/jpg;base64, ' + response.data;
    //                imageArr.push(imagePreview);
    //              /*  const propertyArr = this.state.Properties.slice();
    //               propertyArr[i].Photos = imagePreview; */
    //               this.setState({
    //                   /* Properties: propertyArr, */
    //                  : imageArr
    //               });
    //           });
    //   }
    /* }  */
    /*  }) */
  }

  handleBookNow = async e => {
    console.log(
      "handlebookingnow oemailid" + this.props.propertyData[0].oemailid
    );
    var values = {
      oemailid: this.props.propertyData[0].oemailid,
      pid: this.props.propertyData[0]._id,
      start_date: this.props.searchInputStartDate,
      end_date: this.props.searchInputEndDate,
      /*  accomodates : this.props.propertyData[0].accomodate, */
      accomodates: this.props.searchaccomodates,
      headline: this.props.propertyData[0].headline,
      location: this.props.propertyData[0].address,
      baserate: this.props.propertyData[0].baserate
    };
    console.log(values);

    axios.defaults.withCredentials = true;
    await axios
      .post("http://52.9.107.69:3001/addbooking", values)
      .then(response => {
        if (response.status == 200) {
          this.setState({
            booked: true
          });
        } else {
          this.setState({
            booked: false
          });
        }
      });
    swal("Property booked", "", "success");
  };

  inputHandler = async e => {
    this.setState({
      message: e.target.value
    });
  };

  sendMessageHandler = async e => {
    console.log("msg" + this.state.message);
    console.log("oemail " + this.props.propertyData.oemailid);
    var values = {
      messagethread: this.state.username + " : " + this.state.message,
      oemailid: this.props.propertyData[0].oemailid,
      address: this.props.propertyData[0].address,
      headline: this.props.propertyData[0].headline,
      firstFlag: true
    };
    await this.props.travelerSendMessage(values);
    swal(
      "Message sent to the owner!",
      "Please check your inbox in Profile",
      "success"
    );
  };

  render() {
    // let imageArray = this.state.imageView.map((value) => {
    //     return(
    //         <p><img src={value}></img></p>
    //     )
    // })
    console.log("fetchFlag" + this.props.fetchFlag);
    let detailsright = this.props.propertyData.map((event, i) => {
      return (
        <div props-div>
          <div className="book-now-props">
            <div className="container list-props props-group-traveler-book-now">
              <div>
                <h2>{event.eventname}</h2>
              </div>
              <h3>{event.eventcitystate}</h3>
              <h2>
                <small className="text-muted">{event.eventcountry}</small>
              </h2>
              <div className="props-group-traveler-book-now">
                <div>
                  <b>Event date</b> : {event.eventdate}
                </div>
                <div>
                  <b>Event start time</b> : {event.starttime}
                </div>
                <div>
                  <b>Duration</b> : {event.eventduration}
                </div>
                <div>
                  <b>Details</b> : {event.eventdescription}
                </div>

                <br />
              </div>
              <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  onClick={this.handleBookNow}
                  onclick="toggle_visibility('foo')"
                  className="btn btn-primary btn-md searchbox-submit save-btn"
                  type="button"
                  tabindex="5"
                >
                  Interested
                </button>
              </div>
              <br />
              <br />

              <div class="form-group-book-now shadow-textarea">
                {/*                     <label for="exampleFormControlTextarea6">Shadow and placeholder</label> */}
                <textarea
                  onChange={this.inputHandler}
                  class="form-control-book-now z-depth-1"
                  id="exampleFormControlTextarea6"
                  rows="3"
                  placeholder="Write something here..."
                />
              </div>

              <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="#" onClick={this.sendMessageHandler}>
                  {" "}
                  Send your queries to host{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    });

    let detailsleft = this.props.propertyData.map((property, i) => {
      return (
        <div props-div>
          <div className="take-to-left">
            {/* <div classname= "upper-table">
                <table className = "traveler-table">

                    <tr>
                        
                        <div className = "props-group-traveler"> 
                        <td>Sleeps</td>
                        <td>Bedrooms </td>
                        <td>Bathrooms</td>
                        </div>
                    </tr>

                    <tr>

                    <div className = "props-group-traveler"> 
                    <td align = "center">{property.accomodate}</td>
                    <td align = "center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{property.bedroom} </td>
                    <td align = "center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{property.bathroom} </td>

                    </div>
                    </tr>

                </table>
                
                </div> */}

            <div className="book-now-props">
              <div className="desc">
                <div>{property.description}</div>

                <br />
              </div>
            </div>
          </div>
        </div>
      );
    });

    let alert = null;
    if (this.state.booked) {
      alert = (
        <Alert className="alert" bsStyle="success">
          <h4>You're all set!</h4>
          <p>Booking successful</p>
          <p>
            <Button bsStyle="success">OK</Button>
          </p>
        </Alert>
      );
    }

    return (
      <div>
        <NavBarBlue />
        <div class="row jumbotron jumbotron-traveler">
          <div class="column left1">
            {/* <Carousel showThumbs={false} className = "carousel">
                {imageArray}
                </Carousel> */}
            {/* {detailsleft} */}
          </div>
          <div class="column right1 container container-traveler">
            {detailsright}
          </div>

          {/* alert */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log("state" + state.fetchpropertyreducer.fetchFlag);
  return {
    fetchFlag: state.fetchpropertyreducer.fetchFlag,
    propertyData: state.fetchpropertyreducer.fetchproperty
    // searchInputStartDate : state.searchpropertiesreducer.searchinput.start_date,
    // searchInputEndDate : state.searchpropertiesreducer.searchinput.end_date,
    // searchaccomodates :  state.searchpropertiesreducer.searchinput.accomodates
  };
};

export default connect(
  mapStateToProps,
  { travelerpropertydetails, travelerSendMessage }
)(TravelerPropertyDetails);
