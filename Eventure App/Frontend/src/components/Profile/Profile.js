import React,{Component} from 'react';
import NavBarBlue from '../NavBarBlue/NavBarBlue';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateProfile } from "../../actions";
import swal from 'sweetalert'
import jwtdecode from 'jwt-decode';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import './Profile.css'

//create the Landing Component
class Profile extends Component {
    constructor(props){
        super(props);         
        this.state = {         
            profileData : [],
            imageView : '',
            profilepic : '',
            firstname : null,
            lastname : null,
            aboutme : null,
            country : null,
            company : null,
            languages : null,
            citycountry : null,
            gender : null,
             country: '', 
             region: '' 
        };
    };

        componentWillReceiveProps(nextProps) {
        /*     if (nextProps.newPost) {
              this.props.posts.unshift(nextProps.newPost);
            } */
            console.log("nextprops prof flag" + nextProps.profileUpdated);
            if(nextProps.profileUpdated){
                swal("Profile updated successfully", "","success");
              }
            else{
                swal("Oops!Profile update failed", "","error");
              } 
          }

          componentWillMount(){
            console.log("Token in did mount" + localStorage.getItem("usertoken"))
                if(localStorage.getItem("usertoken")){
                    var tokenvalue = jwtdecode(localStorage.getItem("usertoken"));
                    console.log("decoded  " + tokenvalue)
                    this.setState({
                        token: true,
                        username: tokenvalue.user.firstname,
                        usertype : tokenvalue.user.usertype
                    })
                }
        }

        //get the profile data from backend  
        componentDidMount(){
            axios.defaults.withCredentials = true;
            axios.get('http://localhost:3001/getprofile/')
                    .then((response,err) => {
                         console.log("Profile Data: " + JSON.stringify(response.data));
                    this.setState({
                        profileData : this.state.profileData.concat(response.data)
                    });

                    this.state.profileData.map(profile => { 
                        this.setState(
                            {
                                firstname : profile.firstname,
                                lastname : profile.lastname,
                                aboutme : profile.aboutme,
                                citycountry : profile.citycountry,
                                company : profile.company,
                                zipcode : profile.zipcode,
                                country : profile.country,
                                languages : profile.languages,
                                gender : profile.gender,
                                profilepic : profile.profilepic
                            }
                        );
                        
                    });
                    console.log("pic" + this.state.profileData[0].profilepic)
                    
                    axios.post('http://localhost:3001/download/' + this.state.profilepic)
                    .then(response => {
                        let imagePreview = 'data:image/jpg;base64, ' + response.data;
                         this.setState({
                           imageView : imagePreview
                         });
                    }); 

                });

                
        }

    handleAboutMe = (e) => {
        this.setState({
            aboutme : e.target.value
        })
    }

    handleCityCountry = (e) => {
        this.setState({
            citycountry : e.target.value
        })
    }

    handleCompany = (e) => {
        this.setState({
            company : e.target.value
        })
    }

    handleCountry = (e) => {
        this.setState({
            country : e.target.value
        })
    }

    handleZipcode = (e) => {
        this.setState({
            zipcode : e.target.value
        })
    }

    handleLanguages = (e) => {
            this.setState({
                languages : e.target.value
            })
    }

    handleGender = (e) => {
        this.setState({
            gender : e.target.value
        })
    }

    onChange = (e) => {
        console.log("Inside profile on change" + e.target.files[0])
        if(e.target.name == 'selectedFile'){
          this.setState({
            selectedFile: e.target.files[0]
          })

        }else{
          this.setState({ [e.target.name]: e.target.value });
        }

        let formData = new FormData();
 
        formData.append('selectedFile', e.target.files[0]);
      /*   formData.append('emailid',this.state.emailid); */
        
        axios.post('http://localhost:3001/photos', formData)
            .then((result) => {

                if(result.status === 200)
                {        
                    console.log("res data!!!" + result.data);
                    axios.post('http://localhost:3001/download/'+ result.data)
                    .then(response => {
                    console.log("Image Res : ",response);
                    let imagePreview = 'data:image/jpg;base64, ' + response.data;
                    
                    this.setState({
                        imageView : imagePreview,       //encoded
                        profilepic : result.data        //name of file
                    })             
                })
                 }
            });
    }
  

    handleUpdateProfile = (e) => {

        var values = {
            firstname : this.state.firstname,
            lastname : this.state.lastname,
            aboutme :  this.state.aboutme,
            citycountry : this.state.citycountry,
            company : this.state.company,
            zipcode : this.state.zipcode,
            languages : this.state.languages,
            country : this.state.country,
            gender : this.state.gender,
            profilepic : this.state.profilepic
        }
        
        // this.props.updateProfile(values, () => {
        //     console.log("inside update profile")
        //     console.log("profile updated?" + this.props.profileUpdated)
        //     if(this.props.profileUpdated === true){
        //         swal("Profile updated successfully", "","success");
        //       }
        //         else{
        //           swal("Oops!Profile update failed", "","error");
        //         }
        //   });
        this.props.updateProfile(values);
        
    
        
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
           
        let profileDetails = this.state.profileData.map(profile => {
            return(
                <form>
                <div className = "profile-form-inner">
                    <h3>Profile Information</h3>

                <div>
                    <input type="text" class="form-control input-lg js-input-field" id="profileFirstNameInput" placeholder="First name" value={profile.firstname} ></input>
                </div>

                 <div>
                    <input type="text" class="form-control input-lg js-input-field" id="profileLastNameInput" placeholder="Last name" value={profile.lastname} ></input>
                </div>

                 <div>
                    <textarea onChange = {this.handleAboutMe} class="form-control input-lg js-input-field" id="profileAboutMeInput" placeholder = "About Me" value={this.state.aboutme} rows="4" required=""></textarea>
                </div>

                <div>
                    <input type="text" onChange = {this.handleCompany} class="form-control input-lg js-input-field" id="profileCompanyInput" placeholder="Company" value={this.state.company}></input>
                </div>

                <div>
                    <input type="text" onChange = {this.handleCountry} class="form-control input-lg js-input-field" id="profilecountryInput" placeholder="Country" value={this.state.country}></input>
                </div>

                <div>
                    <input type="text" onChange = {this.handleCityCountry} class="form-control input-lg js-input-field" id="profileCityCountryInput" placeholder="My City, My State" value={this.state.citycountry}></input>
                </div>

                <div>
                    <input type="text" onChange = {this.handleZipcode} class="form-control input-lg js-input-field" id="profileZipcodeInput" placeholder="ZipCode" value={this.state.zipcode}></input>
                </div>

                 <div>
                    <input type="text" onChange = {this.handleLanguages} class="form-control input-lg js-input-field" id="profileLanguagesInput" placeholder="Languages" value={this.state.languages}></input>
                </div>
                
                <div>
                    <input type="text" onChange = {this.handleGender} class="form-control input-lg js-input-field" id="profileLanguagesInput" placeholder="Gender" value={this.state.gender}></input>
                </div>
              
            </div>

            <div>
            <button onClick = {this.handleUpdateProfile} class="btn btn-primary btn-md searchbox-submit save-btn" type="button" tabindex="5">
            Update input
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

            
            
            <div class="text-center">
                    
                    <div>
                    <label  for="uploadPhotoInput" name="description" value={description}
                    onChange={this.onChange} multiple ><img src={this.state.imageView} class="avatar img-circle img-thumbnail" alt="avatar"></img>
                    </label>
                    <input type="file" id="uploadPhotoInput" name="selectedFile" onChange={this.onChange} multiple/>
                    </div>
                    <h2 class="user-name">{this.state.firstname}</h2>
                    <p class="text-muted"><span class="user-location"></span>Member since 2018</p>
            </div>

            <div className = "profile-form-main">
              {profileDetails}
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

export default connect(mapStateToProps, {updateProfile})(Profile);