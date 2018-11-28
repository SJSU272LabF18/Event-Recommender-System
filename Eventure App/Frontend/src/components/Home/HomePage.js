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
import './HomePage.css'
import event1 from '../../images/TED-Talks-for-Small-Business-and-Entrepreneurs.jpg'
import event2 from '../../images/fundraiser event .jpg'
import event3 from '../../images/iotblockchain.jpg'
import img1 from '../../images/presentation.svg'
import img2 from '../../images/like.svg'
import img3 from '../../images/reading.svg'
import NavBarBlue from '../NavBarBlue/NavBarBlue';
import Demo from './Demo';
import {geolocated} from 'react-geolocated';
// import { GoogleComponent } from 'react-google-location'
// const API_KEY = 'AIzaSyAno9izUtTTVDf8zeaElje_wXSHs28j3-4'

//create the Landing Component
class HomePage extends Component {
    constructor(props){
        super(props);  
        this.state = {         
            searchData : [],
            destination : null,
            start_date : null,
            end_date : null,
            accomodates : null,
            isOwner : false,
            username : 'Login'
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

    handleLogout = () => {
      localStorage.removeItem('usertoken')
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

        //===================uncomment here============
    //     return(       
    //     <div>
    //     {redirectVar}
    //     <div className="bg">

    //     <nav className="navbar navigation-bar">
    //     <div className="container-fluid">
    //         <div className="navbar-header">
    //         <Link to = "/home"><img src = {homeawaylogo} height="50" width="200"></img></Link>
    //         </div>
    //         <div className = "navbar nav navbar-right">
    //         <ul className="nav navbar-nav" >
    //         <li className="active"><Link to="#"><font color="white">TripBoards</font></Link></li>
            

    //         <li className="dropdown">
    //             <a className="dropdown-toggle" data-toggle="dropdown" href="#"><font color="white">{this.state.username}</font>
    //             <span className="caret"></span></a>
    //             <ul className="dropdown-menu">
    //             <li><Link to="/profile">My profile</Link></li>
    //             {/* <li><Link to="/landing" onClick = {this.handleLogout}>Logout</Link></li> */}
    //             <li><a href="/landing" onClick = {this.handleLogout}>Logout</a></li>
    //             </ul>
    //         </li>
        
    //         <li className="dropdown">
    //         <a className="dropdown-toggle" data-toggle="dropdown" href="#"><font color="white">Help</font>
    //         <span className="caret"></span></a>
    //         <ul className="dropdown-menu">
    //         <li><Link to="/help">Visit help center</Link></li>
    //         </ul>
    //         </li>
    //         <li>
    //         <button className="site-header-list-your-property btn btn-default btn-inverse" data-bypass="true" onClick = {this.handlerListProperties} >List your property</button>
    //         {this.state.redirectVarOwner} 
    //         {/* <button className="site-header-list-your-property btn btn-default btn-inverse" data-bypass="true" onClick = {this.handlerListProperties}>List your property</button> */}
    //         </li>
    //         <li>
    //         <Link to = "/home"><img src = {birhouselogo} height="45" width="45"></img></Link>
    //         </li>
    //         </ul>
    //         </div>
    //     </div>
    //     </nav>
       
    //     <div className="jumbotron">
        
    //     <div className = "home-inputs">

    //     <div className="container">
    //         <h2 className="display-3"><font color="white">Book beach houses, cabins,<br></br> condos and more, worldwide</font></h2>
    //     </div>

    //     <br></br><br></br>
    //     <form>
    //     <input type = "text" onChange = {this.handleDestination} className = "where" placeholder = "Destination"></input>
    //     &nbsp;&nbsp;
    //     <input type="date" onChange = {this.handleStartDate} className="form-landing"/>
    //     &nbsp;&nbsp;
    
    //     <input type="date" onChange = {this.handleEndDate} className="form-landing" />
    //     &nbsp;&nbsp;
        
    //     <input type = "text" onChange = {this.handleAccomodates} className = "form-landing" placeholder = "Guests"></input>
    //     &nbsp;&nbsp;
    //     <button onClick={this.searchResultsHandler} className="btn btn-primary btn-md searchbox-submit" type="button" tabIndex="5">
    //     Search
    //     </button>
    //     </form>

    //     </div>
    //     </div>


    //     <div className="page-footer font-small pt-4 footer-flex">

    //     {/*     <div className="container-fluid text-center text-md-left"> */}

    //         {/* <div className="row"> */}

    //             <div className="left-class">
    //             <h4><font color="white"><b>Your whole vacation starts here</b></font></h4>
    //             <p><font color="white">Choose a rental from the world's best selection</font></p>
    //             </div>

    //             <div className="middle-class">
    //                 <h4 ><font color="white"><b>Book and stay with confidence</b></font></h4>
    //                 <p><font color="white">Secure payments, peace of mind</font></p>
    //             </div>

    //             <div className="right-class">
    //                 <h4 ><font color="white"><b>Your vacation your way</b></font></h4>
    //                 <p><font color="white">More space, more privacy, no compromises</font></p>       
    //             </div>

    //      {/*    </div> */}
            
    //    {/*      </div> */}


    //     </div>

    //     </div>
    //     </div>
    //     )
    //================complete===============
    return(
        <div>

      <NavBarBlue></NavBarBlue>
            

    <div id="myCarousel" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner" role="listbox">
        <div className="item active">
          <img className="first-slide" src={event1} alt="First slide"/>
          <div className="container">
            <div className="carousel-caption">
              {/* <h1>Example headline.</h1>
              <p>Note: If you're viewing this page via a <code>file://</code> URL, the "next" and "previous" Glyphicon buttons on the left and right might not load/display properly due to web browser security rules.</p> */}
            </div>
          </div>
        </div>
        <div className="item">
          <img className="second-slide" src={event2} alt="Second slide"/>
          <div className="container">
            <div className="carousel-caption">
              <h1></h1>
              <p></p>
            </div>
          </div>
        </div>
        <div className="item">
          <img className="third-slide" src={event3} alt="Third slide"/>
          <div className="container">
            <div className="carousel-caption">
              <h1></h1>
              <p></p>
            </div>
          </div>
        </div>
      </div>
      <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
        <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
        <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>

<div className="container marketing">


<div className="row">
  <div className="col-lg-4">
  <img className="img-circle" src={img1} alt="Generic placeholder image" width="140" height="140"/>
    <h2>Host or Predict Interest</h2>
    <p>In the mood for hosting a party, talk show, workshop, concert, or any event? We got it all covered for you!
    "Evento" provides an excellent platform to host events. To top it up, we provide you with an estimate of the attendance for the event which can help you plan much better! Go ahead and try our unique feature.</p>
    <p><Link to="/hostevent" className="btn btn-default" href="#" role="button">Details &raquo;</Link></p>
  </div>
  <div className="col-lg-4">
  <img className="img-circle" src={img2} alt="Generic placeholder image" width="140" height="140"/>
    <h2>View Recommendations</h2>
    <p>Dive in for an ultimate experience of events specially handpicked for you. Through our efficient learning algorithm, we have come up with a method to recommend the best of the best events satisfying all your information.</p>
    <p><Link to="/eventrecommendation" className="btn btn-default" href="#" role="button">Details &raquo;</Link></p>
  </div>
  <div className="col-lg-4">
  <img className="img-circle" src={img3} alt="Generic placeholder image" width="140" height="140"/>
    <h2>Search Events</h2>
    <p>Attending an event is an opportunity to meet new people, network, improve business opportunities, and have fun. Do more of what you love! Adventure is just a click away. Explore the endless opportunities that MeetUp can offer you.</p>
    <p><Link to="/searchevent" className="btn btn-default" href="#" role="button">Details &raquo;</Link></p>
  </div>
</div>

 <hr className="featurette-divider"/>

<div className="row featurette">
  <div className="col-md-7">
    <h2 className="featurette-heading"> Predict interested users </h2>
    <p className="lead">If you are thinking of hosting an event, let Evento predict the number of users interested in your event, so that you can plan your event better. Evento uses Machine Learning to do the prediction. Just enter the details of the event you are thinking of hosting and click on "Predict"</p>
  </div>
  <div className="col-md-5">
    <img className="featurette-image img-responsive center-block" src={event1} alt="Generic placeholder image" />
  </div>
</div>

<hr className="featurette-divider"/>

<div className="row featurette">
  <div className="col-md-7 col-md-push-5">
    <h2 className="featurette-heading">View tailored Recommendations <span className="text-muted">See for yourself.</span></h2>
    <p className="lead">Based on the kind of events you usually like to attend, our recommendation engine suggests upcoming events for you, that fit your taste</p>
  </div>
  <div className="col-md-5 col-md-pull-7">
    <img className="featurette-image img-responsive center-block" src={event2} alt="Generic placeholder image"/>
  </div>
</div>

<hr className="featurette-divider"/>

<div className="row featurette">
  <div className="col-md-7">
    <h2 className="featurette-heading">And lastly, search events. <span className="text-muted"></span></h2>
    <p className="lead">The good old Search bar allows you to search events taking place around you
</p>
  </div>
  <div className="col-md-5">
    <img className="featurette-image img-responsive center-block" src={event3} alt="Generic placeholder image"/>
  </div>
</div>

<hr className="featurette-divider"/>



      <footer>
          <Demo/>
        <p className="pull-right"><a href="#">Back to top</a></p>
        <p>&copy; 2016 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
      </footer>

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

export default connect(mapStateToProps, {searchProperties})(HomePage);
