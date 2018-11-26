import React,{Component} from 'react';
import NavBarBlue from '../NavBarBlue/NavBarBlue';
import {Redirect} from 'react-router';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { submitAvailability } from "../../actions";
import './SideBar.css'

//create the sidebar Component
class OwnerPricing extends Component {
    constructor(props){
        super(props);  
        this.state = {         
            startdate : null,
            enddate : null
        };
        this.startDateHandler = this.startDateHandler.bind(this);
        this.endDateHandler = this.endDateHandler.bind(this);
        this.submitAvailability = this.submitAvailability.bind(this);
    }

    startDateHandler = (e) => {
        this.setState({
            startdate : e.target.value
        })
    }
    endDateHandler = (e) => {
        this.setState({
            enddate : e.target.value
        })
    }

    submitAvailability = (e) => {

        var values = {
            oemailid : document.cookie.substring(7),
            startdate : this.state.startdate,
            enddate : this.state.enddate
        }

        this.props.submitAvailability(values, () => {
            console.log("Property details added successfully");
          });

    }

    render()
    {
        let redirectVar = null;
        if(this.props.availabilityAddedFlag === true){
          redirectVar = <Redirect to= "/currency"/>
        }
        return(
            <div>
            {redirectVar}
            <NavBarBlue></NavBarBlue>
            
            <div className = "main-div-sidebar row">

            <div className = "col-lg-3 vertical-menu-owner">
            <h4>Welcome</h4>
            <Link to ="/location">Location</Link>
            <Link to ="/details">Details</Link>
            <Link to ="/photos">Photos</Link>
            <Link to ="/pricing">Pricing</Link>
            <Link to ="/ownerdashboard">Dashboard</Link>
            </div>
            
            <div className="container col-lg-9">
                <div className = "location-form">

                <div className="checklist-header-container ">
                <h4><span>Availability</span></h4><hr/>
                </div>

                <form onSubmit = {this.submitAvailability}>

                <div>
                    <label>Start Date</label>
                    <input type="date" onChange = {this.startDateHandler} class="form-control-owner-details input-lg js-input-field" 
                    id="ownerStartDateInput" placeholder="Start Date"></input>
                </div>

                <div>
                    <label>&nbsp;End Date</label>
                    <input type="date" onChange = {this.endDateHandler} class="form-control-owner-details input-lg js-input-field" 
                    id="ownerEndDateInput" placeholder="End Date"></input>
                </div>
            
                

            <div>
                <button type="submit" className="btn btn-primary btn-next">Next</button> 
             </div>

             </form>

             </div>
            </div>
            
            </div>

            </div>
        )
    }

}

const mapStateToProps = state =>{
    return {
        availabilityAddedFlag : state.addpropertyreducer.availabilityAdded
    }
}

export default connect(mapStateToProps, {submitAvailability})(OwnerPricing);