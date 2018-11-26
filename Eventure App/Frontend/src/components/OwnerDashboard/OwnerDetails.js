import React,{Component} from 'react';
import NavBarBlue from '../NavBarBlue/NavBarBlue';
import {Redirect} from 'react-router';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { submitDetails } from "../../actions";
import './SideBar.css'

//create the sidebar Component
class OwnerDetails extends Component {
    constructor(props){
        super(props);  

        this.state = {         
            headline : null,
            type : null,
            description : null,
            bedroom : null,
            accomodate : null,
            bathroom : null
        };
/*         this.submitOwnerDetails = this.submitOwnerDetails.bind(this);
        this.detailsChangeHandler = this.detailsChangeHandler.bind(this); */
    }

    headlineChangeHandler = (e) => {
        this.setState({
            headline : e.target.value
        })
    }
    typeChangeHandler = (e) => {
        this.setState({
            type : e.target.value
        })
    }
    descriptionChangeHandler = (e) => {
        this.setState({
            description : e.target.value
        })
    }
    bedroomChangeHandler = (e) => {
        this.setState({
            bedroom : e.target.value
        })
    }
    accomodateChangeHandler = (e) => {
        this.setState({
            accomodate : e.target.value
        })
    }
    bathroomChangeHandler = (e) => {
        this.setState({
            bathroom : e.target.value
        })
    }

    submitOwnerDetails = (e) => {
        /* var propertydata = JSON.parse(localStorage.getItem('propertydata')); */

        var values = {
            oemailid : document.cookie.substring(7),
            headline : this.state.headline,
            type : this.state.type,
            description : this.state.description,
            bedroom : this.state.bedroom,
            accomodate : this.state.accomodate,
            bathroom : this.state.bathroom
        }

        this.props.submitDetails(values, () => {
            console.log("Property details added successfully");
          });

        /* localStorage.setItem('propertydata', JSON.stringify(data)); */

    }

    render()
    {
        let redirectVar = null;
        if(this.props.detailsAddedFlag === true){
          redirectVar = <Redirect to= "/photos"/>
        } 
        return(
            <div>
            {redirectVar}
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
            
            <div className="container container-owner col-lg-9">
            
                <div className = "location-form">

                <div class="checklist-header-container "><h4><span>Describe your propery</span></h4><hr/></div>
                <form onSubmit = {this.submitOwnerDetails}>
                <div>
                    <input type="text" onChange = {this.headlineChangeHandler} class="form-control-owner-details input-lg js-input-field" id="ownerHeadlineInput" placeholder="Headline" value = {this.state.headline} required></input>
                </div>

                 <div>
                    <input type="text" onChange = {this.typeChangeHandler} class="form-control-owner-details input-lg js-input-field" id="ownerPropertyTypeInput" placeholder="PropertyType" required></input>
                </div>

                 <div>
                    <textarea onChange = {this.descriptionChangeHandler} class="form-control-owner-details input-lg js-input-field" id="ownerPropertyDescInput" placeholder="Property Description" required></textarea>
                </div>

                <div>
                    <input type="text" onChange = {this.bedroomChangeHandler} class="form-control-owner-details input-lg js-input-field" id="ownerBedroomsInput" placeholder="Bedrooms" required></input>
                </div>

                <div>
                    <input type="text" onChange = {this.accomodateChangeHandler} class="form-control-owner-details input-lg js-input-field" id="ownerAccomodatesInput" placeholder="Accomodates" required></input>
                </div>

                <div>
                    <input type="text" onChange = {this.bathroomChangeHandler} class="form-control-owner-details input-lg js-input-field" id="ownerBathroomInput" placeholder="Bathroom" required></input>
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
        detailsAddedFlag : state.addpropertyreducer.detailsAdded
    }
}

export default connect(mapStateToProps, {submitDetails})(OwnerDetails);