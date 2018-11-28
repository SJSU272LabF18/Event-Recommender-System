import React,{Component} from 'react';
import homeawaylogo_blue from '../../images/logo-bceheader-blue.svg'
import birhouselogo_blue from '../../images/birdhouse-bceheader-blue.svg'
import sjsu_gold_logo from '../../images/eventologo.png'


//create the Landing Component
class NavBar extends Component {
    constructor(props){
        super(props);  
    }

    handleLogout = () => {
        localStorage.removeItem('usertoken')
     }

    render()
    {
        return(
            <div>
                <nav class="navbar navbar-white">
                    <div className="container-fluid">
                    <div className="navbar-header">
                    <img src = {sjsu_gold_logo} height="50" width="200"></img>
                </div>
                    {/* <ul className="nav navbar-nav navbar-right">
                    &nbsp;&nbsp;&nbsp;&nbsp;<li><img src = {sjsu_gold_logo} height="50" width="50"></img></li>
                    </ul> */}

                </div>
                </nav>
            
            </div>
        )
    }

}

export default NavBar;