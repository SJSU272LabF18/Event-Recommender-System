import React,{Component} from 'react';
import NavBarBlue from '../NavBarBlue/NavBarBlue';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { submitLocation } from "../../actions";
import './SideBar.css'

//create the sidebar Component
class OwnerLocation extends Component {  

    componentWillReceiveProps(nextProps) {
     //   console.log(nextProps);
    }


    submitAddress(values) {

        this.props.submitLocation(values, () => {
            console.log("address" + values)
          });
    }

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
        const typeFromField = field.type;
        const placeHolder = field.placeholder;
    
        return (
          <div className={className}>
            <label>{field.label}</label>
            <input  className="form-control-owner-details input-lg js-input-field"  placeholder={placeHolder} type={typeFromField} {...field.input} />
            <div className="text-help">
              {touched ? error : ""}
            </div>
          </div>
        );
      }
    

    render()
    {
        const { handleSubmit } = this.props;
        let redirectVar = null;
            if(this.props.locationAddedFlag === true){
              redirectVar = <Redirect to= "/details"/>
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
            
            <div className="container col-lg-9">
            <div className = "location-form">
                <div class="checklist-header-container ">
                <h4><span>Verify the location of your rental</span></h4><hr/>
                </div>

                 <form onSubmit={handleSubmit(this.submitAddress.bind(this))}>
                 <div className = "form-group">
                <Field
                    type = "textarea"
                    id="ownerAddress" 
                    placeholder="City" 
                    label="City"
                    name="location"    
                    component={this.renderField}               
                />

                <Field
                    type = "text"
                    id="state" 
                    placeholder="State" 
                    label="State"
                    name="state"    
                    component={this.renderField}               
                />

                <Field
                    type = "text"
                    id="country" 
                    placeholder="Country" 
                    label="Country"
                    name="country"    
                    component={this.renderField}               
                />

                <Field
                    type = "text"
                    id="street" 
                    placeholder="Street Address" 
                    label="Street"
                    name="street"    
                    component={this.renderField}               
                />

                 <Field
                    type = "text"
                    id="zipcode" 
                    placeholder="Zipcode" 
                    label="Zipcode"
                    name="zipcode"    
                    component={this.renderField}               
                />



                </div>


                <button type="submit" className="btn btn-primary btn-next">Next</button>
                </form>

            </div>
            </div>
            
            </div>

            </div>
        )
    }

}

function validate(values) {

    const errors = {};
  
    // Validate the inputs from 'values'
    if (!values.location) {
      errors.location = "Enter a location";
    }

    if (!values.state) {
        errors.state = "Enter a state";
      }

    if (!values.country) {
        errors.country = "Enter a country";
      }

    if (!values.street) {
        errors.street = "Enter a street address";
      }

    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
  }

const mapStateToProps = state =>{
    return {
        locationAddedFlag : state.addpropertyreducer.locationAdded

    }
}

export default reduxForm({
    validate,
    form: "OwnerLocation"
  })(connect(mapStateToProps, {submitLocation})(OwnerLocation));

  