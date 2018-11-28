import React, {Component} from 'react';
import '../../App.css';
/* import axios from 'axios';
import cookie from 'react-cookies'; */
import {Redirect} from 'react-router';
import NavBar from '../NavBarSignUp/NavBar';
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { submitLogin } from "../../actions";

//Define a Login Component
class OwnerLogin extends Component{

  componentWillReceiveProps(nextProps) {
/*     if (nextProps.newPost) {
      this.props.posts.unshift(nextProps.newPost);
    } */
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    const typeFromField = field.type;
    const placeHolder = field.placeholder;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control1" placeholder={placeHolder} type={typeFromField} {...field.input} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

    
    //submit Login handler to send a request to the node backend
    onSubmit(values) {
        console.log(values);
        this.props.submitLogin(values, () => {
          console.log("inside onsubmit")
      /*     this.props.history.push("/ownerlogin"); */
        });
    }

    render(){  
        const { handleSubmit } = this.props;
            //redirect based on successful login
            let redirectVar = null;
            if(localStorage.getItem('usertoken') && this.props.authFlag === true){
              redirectVar = <Redirect to= "/homepage"/>
            } 
        return(
            <div>
            {redirectVar}
            <NavBar></NavBar>
            <div className = "main-login">
            
            <div className="login-header text-center col-md-12 traveler">
            <h1>Log in to Evento</h1>
            Need an account?     
            <Link to="/signup">Sign Up</Link>
            </div>

            <div className="container">             
                <div className="login-form">
                    <div className="main-div">
                      
                    <div className="panel-heading">
                    <p className="panel-title">Account login</p>
                    </div>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
      
                    <Field
                        type = "email"
                        placeholder = "Email ID"
                        label="Email"
                        name="emailid"    
                        component={this.renderField}
                   
                    />

                    <Field
                        type = "password"
                        placeholder = "Password"
                        label="Password"
                        name="password"
                        component={this.renderField}
                           
                    />
    
                    <button type="submit" className="btn btn-primary">Log in</button>
                    </form>

                        </div>
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
    if (!values.emailid) {
      errors.emailid = "Enter an email";
    }
    if (!values.password) {
      errors.password = "Enter password";
    }
  
    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
  }

  const mapStateToProps = state => ({
    authFlag: state.loginreducer.ownerauthFlag,
  });
  
  
  export default reduxForm({
    validate,
    form: "OwnerLoginForm"
  })(connect(mapStateToProps, { submitLogin })(OwnerLogin));
  
