import React,{Component} from 'react';
import NavBarBlue from '../NavBarBlue/NavBarBlue';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { submitProperty } from "../../actions";
import swal from 'sweetalert'
import './SideBar.css';

//create the sidebar Component
class OwnerCurrency extends Component {
    constructor(props){
        super(props); 
        this.state = {         
            baserate : null
        };
    }

    baserateChangeHandler = (e) => {
        this.setState({
            baserate : e.target.value
        })
    }

    submitBaseRate = (e) => {

        var values = {
            oemailid : document.cookie.substring(7),
            address : this.props.address,
            state : this.props.state,
            country : this.props.country,
            street : this.props.street,
            zipcode : this.props.zipcode,
            headline : this.props.headline,
            type : this.props.type,
            description :  this.props.description,
            bedroom : this.props.bedroom,
            accomodate : this.props.accomodate,
            bathroom : this.props.bathroom,
            images : this.props.images,
            startdate : this.props.startdate,
            enddate : this.props.enddate,
            baserate : this.state.baserate

        }

        this.props.submitProperty(values)
        swal("Property details added successfully", "","success");
    }

    render()
    {
/*         let redirectVar = null;
        if(this.props.propertyAddedFlag === true){
          redirectVar = <Redirect to= "/ownerdashboard"/>
        } */

        return(
            <div>
            {/*redirectVar*/}
            <NavBarBlue></NavBarBlue>
            <div className = "main-div-sidebar row">
            <div className = "col-lg-3 vertical-menu-owner">
            <h4>Welcome</h4>
            <Link to="/location">Location</Link>
            <Link to="/details">Details</Link>
            <Link to="/photos">Photos</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/ownerdashboard">Dashboard</Link>
            </div>
            
            <div className="container col-lg-9">
                <div className = "location-form">

                <div class="checklist-header-container ">
                <h4><span>Availability</span></h4><hr/>
                </div>

                <div class="row form-group">
                
                <div class="col-sm-12 col-md-7">               <label>Currency Type</label>
                    <select class="form-control-owner-details input-lg js-input-field" data-input-model-name="currencyType">
                            <option disabled="" hidden="" value="" selected="selected">Currency Type</option>
                            <option value="usd">USD</option>
                            <option value="euro">Euro</option>
                            <option value="other">Other</option>
                    </select>
                    </div>
                </div>

                <div>
                    <label>Nightly Base Rate</label>
                    <input type="text" onChange = {this.baserateChangeHandler} class="form-control-owner-details input-lg js-input-field" 
                    id="ownerStartDateInput" placeholder="$"></input>
                </div>

            <div>
                <button type="submit" onClick={this.submitBaseRate} className="btn btn-primary btn-next">Next</button> 
             </div>



             </div>
            </div>
            
            </div>

            </div>
        )
    }

}

const mapStateToProps = state =>{
    return {
        propertyAddedFlag : state.addpropertyreducer.propertyAdded,
        address : state.addpropertyreducer.location.location,
        state : state.addpropertyreducer.location.state,
        country : state.addpropertyreducer.location.country,
        street : state.addpropertyreducer.location.street,
        zipcode : state.addpropertyreducer.location.zipcode,
        headline : state.addpropertyreducer.details.headline,
        type : state.addpropertyreducer.details.type,
        description :  state.addpropertyreducer.details.description,
        bedroom : state.addpropertyreducer.details.bedroom,
        accomodate : state.addpropertyreducer.details.accomodate,
        bathroom : state.addpropertyreducer.details.bathroom,
        images : state.addpropertyreducer.photos.images,
        startdate : state.addpropertyreducer.availability.startdate,
        enddate :state.addpropertyreducer.availability.enddate,
    }
}

export default connect(mapStateToProps, {submitProperty})(OwnerCurrency);