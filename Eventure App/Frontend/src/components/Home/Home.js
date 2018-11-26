import React,{Component} from 'react';
import homeawaylogo from '../../images/logo-homeaway-white.svg';
import birhouselogo from '../../images/birdhouse-bceheader-white.svg';
import cookie from 'react-cookies';
import axios from 'axios';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { searchProperties } from "../../actions";
import {Redirect} from 'react-router';
import jwtdecode from 'jwt-decode';
import swal from 'sweetalert'
import NavBarBlue from '../NavBarBlue/NavBarBlue';

//create the Landing Component
class Home extends Component {
    constructor(props){
        super(props);  
        this.state = {         
            searchData : [],
            destination : null,
            start_date : null,
            end_date : null,
            accomodates : null,
            isOwner : false
        };
    }

    
    componentWillMount(){
            if(localStorage.getItem("usertoken")){
                var tokenvalue = jwtdecode(localStorage.getItem("usertoken"));
                this.setState({
                    token: true,
                    username: tokenvalue.user.firstname,
                    usertype : tokenvalue.user.usertype
                })
            }
    }
    
    searchResultsHandler = async (e) => {
        var searchData = []
        var values = {
            destination : this.state.destination,
            start_date : this.state.start_date,
            end_date : this.state.end_date,
            accomodates : this.state.accomodates
        }
        console.log("Inside search results")

//        localStorage.setItem('searchdata', JSON.stringify(data));

/*         axios.post('http://localhost:3001/searchproperties',data)
            .then(response => {
                if(response.status == 200){
                    console.log("res" + response.data)
                     this.setState({
                        searched : true,
                        searchData : this.state.searchData.concat(response.data)
                    }) 
                     searchData  = response.data
                     localStorage.setItem('searchdata', JSON.stringify(searchData));
                }else{
                    this.setState({
                        searched : false
                    })
                }
            }) 
            */
           await this.props.searchProperties(values);
            console.log(this.props.searchresults)

           
           
    }
   
    handleLogout = () => {
        localStorage.removeItem('usertoken')
     }

    handleDestination = (e) => {
        this.setState({
            destination : e.target.value
        })
    }

    handleStartDate = (e) => {
        this.setState({
            start_date : e.target.value
        })
    }

    handleEndDate = (e) => {
        this.setState({
            end_date : e.target.value
        })
    }

    handleAccomodates = (e) => {
        this.setState({
            accomodates : e.target.value
        })
    }

    handlerListProperties = (e) => {

       // var emailid = document.cookie.substring(7);

        /* axios.get('http://localhost:3001/getusertype/'+ emailid)
            .then(response => {
                console.log(response.data[0].usertype);
                if(response.status === 200 && response.data[0].usertype == "owner"){
                    this.setState({
                        isOwner : true
                    })
                }else{
                    this.setState({
                        isOwner : false
                    })
                }
            }) */
            if(this.state.usertype == "owner")
            {
                this.setState({
                    redirectVarOwner :  <Redirect to = "/sidebar"/>
                })
               
            }
            else if (this.state.usertype == "traveler"){
                swal("Please login as an owner","","warning")
                this.setState({
                    redirectVarOwner : <Redirect to = "/ownerlogin"/>
                })             
            }
    }
    

    render(){
        let redirectVar = null;
        let redirectVarOwner = null;
        if(this.props.searchFlag===true){
            redirectVar = <Redirect to= "/searchresults"/>
        }
/*         if(this.state.usertype === "traveler"){
            redirectVarOwner = <Redirect to = "/ownerlogin"/>
        } 
        else if (this.state.usertype === "owner")
        {
            redirectVarOwner = <Link to="/sidebar" className="site-header-list-your-property btn btn-default btn-inverse" data-bypass="true" >List your property</Link>
        } */
        return(       
        <div>
        {redirectVar}
        <div className="bg">
        <NavBarBlue></NavBarBlue>
        <div className="jumbotron">
        
        <div className = "home-inputs">
            <br></br><br></br> 
        <div className="container">
            <h2 className="display-3"><font color="white">Network, Collaborate and Explore!<br/><br/> Adventure is just a click away</font></h2>
        </div>

        <br></br><br></br>
        <form className = "searchform">
        <input type = "text" onChange = {this.handleDestination} className = "where" placeholder = "Location"></input>
        &nbsp;&nbsp;
        <input type="date" onChange = {this.handleStartDate} className="form-landing"/>
        &nbsp;&nbsp;

        <button onClick={this.searchResultsHandler} className="btn btn-primary btn-md searchbox-submit" type="button" tabIndex="5">
        Search
        </button>
        </form>

        </div>
        </div>


        <div className="page-footer font-small pt-4 footer-flex">

        {/*     <div className="container-fluid text-center text-md-left"> */}

            {/* <div className="row"> */}

                <div className="left-class">
                <h4><font color="white"><b>Customize your selection</b></font></h4>
                <p><font color="white">Choose an event tailored to suit your interests</font><br/><font color="white">Navigate to view recommendations page</font></p>
                </div>

                <div className="middle-class">
                    <h4 ><font color="white"><b>Never miss an interesting event</b></font></h4>
                    <p><font color="white">You can use MeetUps to find and book events<br/> in any location</font></p>
                </div>

                <div className="right-class">
                    <h4 ><font color="white"><b>Host Events your way</b></font></h4>
                    <p><font color="white">Get all your alerts at one place, whether it is for an event your friend invited you to or it is from MeetUps itself.</font></p>       
                </div>

         {/*    </div> */}
            
       {/*      </div> */}


        </div>

        </div>
        </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        searchFlag : state.searchpropertiesreducer.searchFlag,
        searchresults : state.searchpropertiesreducer.searchresults
    }
}

export default connect(mapStateToProps, {searchProperties})(Home);
