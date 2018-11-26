import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBar from '../NavBarSignUp/NavBar';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { submitTravelerSignUp } from "../../actions";

//Define a Login Component
class UserSignUp extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            emailid : "",
            password : "",
            firstname : "",
            lastname : "",
            usertype : 'traveler',
           /*  authFlag : false, */
            err : ''
        }
        //Bind the handlers to this class
        this.emailidChangeHandler = this.emailidChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
        this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
        this.handleTravelerSignup = this.handleTravelerSignup.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
/*     componentWillMount(){
        this.setState({
            authFlag : false
        })
    } */

    componentWillReceiveProps(nextProps) {
        /*     if (nextProps.newPost) {
              this.props.posts.unshift(nextProps.newPost);
            } */
          }

    //emailid change handler to update state variable with the text entered by the user
    emailidChangeHandler = (e) => {
        this.setState({
            emailid : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    firstnameChangeHandler = (e) => {
        this.setState({
            firstname : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    lastnameChangeHandler = (e) => {
        this.setState({
            lastname : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    handleTravelerSignup =  (e) => {

        e.preventDefault();
        const values = {
            emailid : this.state.emailid,
            password : this.state.password,
            firstname : this.state.firstname,
            lastname : this.state.lastname,
            usertype : this.state.usertype,
            profilepic : "avatar.png"
        }

        this.props.submitTravelerSignUp(values)

        
/*         axios.post('http://localhost:3001/signup',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true
                    })
                }else if(response.status === 202){
                    this.setState({
                        authFlag : false,
                        err : response.data
                    })
                }
            }); */
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(this.props.travelersignUpFlag){
            redirectVar = <Redirect to= "/travelerlogin"/>
        }
        return(
            <div>
             {redirectVar} 
            <NavBar></NavBar>
            <div class = "main-login">
            
            <div class="login-header text-center col-md-12 traveler">
            <h1>Sign Up for HomeAway</h1>
            Already have an account?     
            <Link to="/travelerlogin">Log in</Link>
            </div>

            <div className="container">             
                <div className="login-form">
                    <div className="main-div">
                      
                    <div class="panel-heading">
                    <p class="panel-title">Create an Account</p>
                    </div>
                             <p><font color="red">{this.state.err}</font></p>
                             <form  onSubmit = {this.handleTravelerSignup}>
                            <div className="form-group">
                                <input onChange = {this.firstnameChangeHandler} type="text" className="form-control1" name="firstname" placeholder="First Name" required/>
                            </div>
                            <div className="form-group">
                                <input onChange = {this.lastnameChangeHandler} type="text" className="form-control1" name="lastname" placeholder="Last name" required/>
                            </div>

                            <div className="form-group">
                                <input onChange = {this.emailidChangeHandler} type="email" className="form-control1" name="emailid" placeholder="Email address" required/>
                            </div>
                            <div className="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" className="form-control1" name="password" placeholder="Password" required/>
                            </div>

                            <button className="btn btn-primary">Sign Up</button> 
                            </form>

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
        travelersignUpFlag : state.signupreducer.travelersignUpFlag
    }
}

export default connect(mapStateToProps, {submitTravelerSignUp})(UserSignUp);