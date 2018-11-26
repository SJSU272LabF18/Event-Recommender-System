import React,{Component} from 'react';
import homeawaylogo from '../../images/logo-homeaway-white.svg';
import birhouselogo from '../../images/birdhouse-bceheader-white.svg';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';

//create the Landing Component
class LandingPage extends Component {
    constructor(props){
        super(props);  
    }

    
    handleLogout = () => {
        localStorage.removeItem('usertoken')
     }
   
    render(){
        

        return(
            
        <div>
        <div class="bg">

        <nav class="navbar navigation-bar">
        <div class="container-fluid">
            <div class="navbar-header">
            <Link to = "/home"><img src = {homeawaylogo} height="50" width="200"></img></Link>
            </div>
            <div class = "navbar nav navbar-right">
            <ul class="nav navbar-nav" >
            <li class="active"><Link to="#"><font color="white">TripBoards</font></Link></li>
            

            <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#"><font color="white">Login</font>
                <span class="caret"></span></a>
                <ul class="dropdown-menu">
                <li><Link to="/travelerlogin">Traveler Login</Link></li>
                <li><Link to="/ownerlogin">Owner Login</Link></li>
                </ul>
            </li>
        
            <li class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#"><font color="white">Help</font>
            <span class="caret"></span></a>
            <ul class="dropdown-menu">
            <li><Link to="/help">Visit help center</Link></li>
            </ul>
            </li>
            <li>
            <Link to="/ownerlogin"class="site-header-list-your-property btn btn-default btn-inverse" data-bypass="true" >List your property</Link>
            </li>
            <li>
            <Link to = "/home"><img src = {birhouselogo} height="45" width="45"></img></Link>
            </li>
            </ul>
            </div>
        </div>
        </nav>
       
        <div class="jumbotron">
        
        <div className = "home-inputs">

        <div class="container">
            <h2 class="display-3"><font color="white">Book beach houses, cabins,<br></br> condos and more, worldwide</font></h2>
        </div>

        <br></br><br></br>
        <form>
        <input type = "text" class = "where" placeholder = "Destination"></input>
        &nbsp;&nbsp;
        <input type="date" class="form-landing"/>
        &nbsp;&nbsp;
    
        <input type="date" class="form-landing" />
        &nbsp;&nbsp;
        
        <input type = "text" class = "form-landing" placeholder = "Guests"></input>
        &nbsp;&nbsp;
        <button class="btn btn-primary btn-md searchbox-submit" type="button" tabindex="5" Link to = "/travelerlogin">
        Search
        </button>
        </form>

        </div>
        </div>


        <div class="page-footer font-small pt-4 footer-flex">

        {/*     <div class="container-fluid text-center text-md-left"> */}

            {/* <div class="row"> */}

                <div class="left-class">
                <h4 class><font color="white"><b>Your whole vacation starts here</b></font></h4>
                <p><font color="white">Choose a rental from the world's best selection</font></p>
                </div>

                <div class="middle-class">
                    <h4 class><font color="white"><b>Book and stay with confidence</b></font></h4>
                    <p><font color="white">Secure payments, peace of mind</font></p>
                </div>

                <div class="right-class">
                    <h4 class><font color="white"><b>Your vacation your way</b></font></h4>
                    <p><font color="white">More space, more privacy, no compromises</font></p>       
                </div>

         {/*    </div> */}
            
       {/*      </div> */}


        </div>

        </div>
        </div>
        )
    }
}

export default LandingPage;
