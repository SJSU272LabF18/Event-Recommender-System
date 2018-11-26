import React,{Component} from 'react';
import cookie from 'react-cookies';
import homeawaylogo_blue from '../../images/logo-bceheader-blue.svg'
import birhouselogo_blue from '../../images/birdhouse-bceheader-blue.svg'
import { Link } from "react-router-dom";
import jwtdecode from 'jwt-decode';
import './NavBarBlue.css'


//create the  Component
class NavBar extends Component {
    constructor(props){
        super(props);  
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

    componentWillMount(){
        console.log("Token in did mount" + localStorage.getItem("usertoken"))
            if(localStorage.getItem("usertoken")){
                var tokenvalue = jwtdecode(localStorage.getItem("usertoken"));
                this.setState({
                    token: true,
                    username: tokenvalue.user.firstname,
                    usertype : tokenvalue.user.usertype
                })
            }
    }

    render()
    {
        return(
        //     <div>
        //         <nav className="navbar navbar-blue navigation-bar">
        // <div className="container-fluid">
        //     <div className="navbar-header">
        //     <Link to = "/logo"><img src = {homeawaylogo_blue} height="50" width="200"></img></Link>
        //     </div>
        //     <div className = "navbar navbar-blue nav navbar-right">
        //     <ul className="nav navbar-nav" >
        //     <li className="active"><Link to="#"><font color="#0067db">TripBoards</font></Link></li>
        //     <li className="dropdown">
        //         <Link to ="#" className="dropdown-toggle" data-toggle="dropdown"><font color="#0067db">{this.state.username}</font>
        //         <span className="caret"></span></Link>
        //         <ul className="dropdown-menu">
        //         <li><Link to="/profile">My profile</Link></li>
        //        {/*  <li><Link to="/landing" onClick = {this.handleLogout}>Logout</Link></li> */}
        //        <li><a href="/landing" onClick = {this.handleLogout}>Logout</a></li>
        //         </ul>
        //     </li>
        //     <li className="dropdown">
        //     <Link to="#" className="dropdown-toggle" data-toggle="dropdown" ><font color="#0067db">Help</font>
        //     <span className="caret"></span></Link>
        //     <ul className="dropdown-menu">
        //     <li><Link to="#">Visit help center</Link></li>
        //     <li><Link to="#">Owner Login</Link></li>
        //     </ul>
        //     </li>
        //     <li>
        //     <Link to="/sidebar" className="site-header-list-your-property btn btn-default btn-inverse" data-bypass="true">List your property</Link>
        //     </li>
        //     <li>
        //     <Link to = "/logo"><img src = {birhouselogo_blue} height="45" width="45"></img></Link>
        //     </li>
        //     </ul>
        //     </div>
        // </div>
        // </nav>
        //  </div>
      <div>

        <div className="navbar-wrapper">
        <div className="container">

            <nav className="navbar navbar-inverse navbar-static-top">
            <div className="container">
                <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="/homepage">SJSU MeetUps</a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                    <li className="active"><Link to="/homepage">Home</Link></li>
                    <li><Link to="/aboutus">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li className="dropdown">
                    <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.state.username} <span className="caret"></span></Link>
                    <ul className="dropdown-menu">
                        <li><Link to="/profile">My Profile</Link></li>
                        <li><Link to="#">Help Page</Link></li>
                        <li role="separator" className="divider"></li>
                        
                        <li><Link to="/login" onClick = {this.handleLogout}>Logout</Link></li>
                    </ul>
                    </li>
                </ul>
                </div>
            </div>
            </nav>

        </div>
        </div>

    </div>
        )
    }

}

export default NavBar;