import React,{Component} from 'react';
import NavBarBlue from '../NavBarBlue/NavBarBlue';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { postEvent } from "../../actions";
import swal from 'sweetalert'
import jwtdecode from 'jwt-decode';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import './HostEvent.css'

//create the Landing Component
class HostEvent extends Component {
    constructor(props){
        super(props);         
        this.state = {         
            eventData : [],
            eventname : null,
            eventdescription: null,
            eventdate : null,
            starttime : null,
            eventduration : null,
            eventvenue : null,
            eventcity : null,
            eventstate : null,
            eventzip : null,
            eventcountry : null,
            eventflag : false,
            images : ''
        };
    };
        //get the profile data from backend  
        componentDidMount(){
            axios.defaults.withCredentials = true;
            axios.get('http://localhost:3001/getprofile/')
                    .then((response,err) => {
                         console.log("Profile Data: " + JSON.stringify(response.data));
                    this.setState({
                        eventData : this.state.eventData.concat(response.data)
                    });

                    this.state.eventData.map(event => { 
                        this.setState(
                            {
                                eventname : event.eventname,
                                eventdescription : event.eventdescription,
                                eventdate : event.eventdate,
                                starttime : event.starttime,
                                eventduration : event.duration,
                                eventvenue : event.venue,
                                eventcity : event.city,
                                eventstate : event.state,
                                eventzip : event.zip,
                                eventcountry : event.country,
                                images : event.images
                            }
                        );
                        
                    });

                });
             
        }

    handleEventName = (e) => {
        this.setState({
            eventname : e.target.value
        })
    }

    handleEventDescription = (e) => {
        this.setState({
            eventdescription : e.target.value
        })
    }

    handleEventDate = (e) => {
        this.setState({
            eventdate : e.target.value
        })
    }

    handleStartTime = (e) => {
        this.setState({
            starttime : e.target.value
        })
    }

    handleEventDuration = (e) => {
        this.setState({
            eventduration : e.target.value
        })
    }

    handleEventVenue = (e) => {
        this.setState({
            eventvenue : e.target.value
        })
    }
    handleEventCity = (e) => {
        this.setState({
            eventcity : e.target.value
        })
    }
    handleEventState = (e) => {
        this.setState({
            eventstate : e.target.value
        })
    }
    handleEventZip = (e) => {
        this.setState({
            eventzip : e.target.value
        })
    }
    handleEventCountry = (e) => {
        this.setState({
            eventcountry : e.target.value
        })
    }


    onChange = (e) => {
        console.log("Inside onchange")
        console.log(e.target.files);
        if(e.target.name == 'selectedFile'){
          this.setState({
            selectedFile: e.target.files
          })
          
        }else{
          this.setState({ 
              [e.target.name]: e.target.value
        });

        const { description, selectedFile} = this.state;
        let formData = new FormData();
        formData.append('description', description);
        for(let i = 0 ; i < Object.keys(this.state.selectedFile).length ; i++)
        {
        formData.append('selectedFile', selectedFile[i]);
        }
  
          axios.post('http://localhost:3001/photos', formData)
            .then((result) => {
                if (result.status===200)
                {
                    this.setState({
                        eventflag : true,
                        images : result.data        //name of file
                    })
                }

            });
    
        }   
    }
  

    handleCreateEvent= (e) => {

        var values = {
            eventname :  this.state.eventname,
            eventdescription : this.state.eventdescription,
            eventdate : this.state.eventdate,
            starttime : this.state.starttime,
            duration : this.state.duration,
            venue : this.state.venue,
            city : this.state.city,
            state : this.state.state,
            zip : this.state.zip,
            country : this.state.country,
            images : this.state.images
        }
        
        this.props.postEvent(values);
        
    
        
    }


    render()
    {   
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
            return(
                <form>
                <div className = "profile-form-inner">
                    <h3>Host New Event</h3>
                 
                <div>
                    <input type="text" onChange = {this.handleEventName} class="form-control input-lg js-input-field" id="hostEventName" placeholder="Event Name" value={this.state.eventname}></input>
                </div>
                <div>
                    <textarea onChange = {this.handleEventDescription} class="form-control input-lg js-input-field" id="hostEventDescription" placeholder = "Event Description" value={this.state.eventdescription} rows="4" required=""></textarea>
                </div>

                <div>
                    <input type="date" onChange = {this.handleEventDate} class="form-control input-lg js-input-field" id="hostEventDate" placeholder="Event Date" value={this.state.eventdate}></input>
                </div>

                <div>
                    <input type="time" onChange = {this.handleStartTime} class="form-control input-lg js-input-field" id="hostStartTime" placeholder="Event Start time" value={this.state.starttime}></input>
                </div>

                <div>
                    <input type="text" onChange = {this.handleEventDescription} class="form-control input-lg js-input-field" id="hostEventDuration" placeholder="Event Duration" value={this.state.eventduration}></input>
                </div>
                <div className = "profile-form-inner"></div>
                    <h3>Venue Details</h3>

                <div>
                    <input type="text" onChange = {this.handleEventVenue} class="form-control input-lg js-input-field" id="eventVenue" placeholder="Venue Details" value={this.state.eventvenue}></input>
                </div>
                <div>
                    <input type="text" onChange = {this.handleEventCity} class="form-control input-lg js-input-field" id="eventCity" placeholder="City" value={this.state.eventcity}></input>
                </div>
                <div>
                    <input type="text" onChange = {this.handleEventState} class="form-control input-lg js-input-field" id="eventState" placeholder="State" value={this.state.eventstate}></input>
                </div>
                <div>
                    <input type="text" onChange = {this.handleEventZip} class="form-control input-lg js-input-field" id="eventZip" placeholder="Zip code" value={this.state.eventzip}></input>
                </div>

                <div>
                    <input type="text" onChange = {this.handleEventCountry} class="form-control input-lg js-input-field" id="eventCountry" placeholder="Country" value={this.state.eventcountry}></input>
                </div>
                
                
                 <div class="photos-drop-inside">
                    <h2 class="photo-drop-title text-muted">Drop photos here</h2>
                    <h2 class="photo-drop-OR text-muted">or</h2>
                   
                 <div><label  for="uploadPhotoInput" name="description" value={description}
                    onChange={this.onChange} multiple class="photo-drop-button btn btn-default center-block">Select Photos to Upload</label>
                 <input type="file" id="uploadPhotoInput" multiple name="selectedFile" onChange={this.onChange}/>
                 </div>

                 </div>
                
              
            </div>

            <div>
            <button onClick = {this.handleCreateName} class="btn btn-primary btn-md searchbox-submit save-btn" type="button" tabindex="5">
            Create Event
            </button>
            </div>

            </form>
            )
        })
        //if not logged in go to login page
/*         let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/travelerlogin"/>
        } */

        return(

            
            <div>
            <NavBarBlue></NavBarBlue>

            <div className = "profile-form-main">
              {EventDetails}
            </div>
            
            </div>
        )
    }

}

const mapStateToProps = state =>{
    console.log("mstp" + state.profilereducer.profileUpdated);
    return {
        profileUpdated : state.profilereducer.profileUpdated
    }
}

export default connect(mapStateToProps, {postEvent})(HostEvent);