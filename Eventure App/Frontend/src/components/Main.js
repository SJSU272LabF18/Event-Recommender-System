import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './Home/Home';
import LandingPage from './Home/LandingPage';
import NavBarSignUp from './NavBarSignUp/NavBar';
import Profile from './Profile/Profile';
import TravelerSignUp from './UserSignUp/TravelerSignUp'
import OwnerSignUp from './UserSignUp/OwnerSignUp'
import NavBarBlue from './NavBarBlue/NavBarBlue';
import OwnerLogin from './Login/OwnerLogIn';
import TravelerLogin from './Login/TravelerLogin';
import SideBar from './OwnerDashboard/SideBar';
import OwnerLocation from './OwnerDashboard/OwnerLocation';
import OwnerDetails from './OwnerDashboard/OwnerDetails'
import OwnerPhotos from './OwnerDashboard/OwnerPhotos'
import OwnerPricing from './OwnerDashboard/OwnerPricing'
import OwnerCurrency from './OwnerDashboard/OwnerCurrency'
import SearchResults from './SearchResults/SearchResults';
import TravelerPropertyDetails from './TravelerPropertyDetails/TravelerPropertyDetails'
import OwnerDashboard from './OwnerDashboard/OwnerDashboard'
import MyTrips from './MyTrips/MyTrips'
import TravelerInboxListings from './Inbox/TravelerInboxListings' 
import TravelerInbox from './Inbox/TravelerInbox';
import OwnerInboxListings from './Inbox/OwnerInboxListings';
import OwnerInbox from './Inbox/OwnerInbox';
import HomePage from './Home/HomePage';
import Recommendations from './Events/Recommendations'
import EventPage from './Events/HostEvent';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/* <Route path="/" component={Landing}/> */}
                <Route path="/travelerlogin" component={TravelerLogin}/>
                <Route path="/login" component={OwnerLogin}/>
                <Route path="/travelersignup" component={TravelerSignUp}/>
                <Route path="/signup" component={OwnerSignUp}/>
                <Route path="/searchevent" component={Home}/>
                <Route path="/eventrecommendation" component={Recommendations}/>
                <Route path="/hostevent" component={EventPage}/>
                {/*<Route path="/eventsearch" component={Home}/> */}
                <Route path="/homepage" component={HomePage}/>
                <Route path="/landing" component={LandingPage}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/navbarsignup" component={NavBarSignUp}/>
                <Route path="/navbarblue" component={NavBarBlue}/>
                <Route path="/sidebar" component={SideBar}/>
                <Route path="/location" component={OwnerLocation}/>
                <Route path="/details" component={OwnerDetails}/>
                <Route path="/photos" component={OwnerPhotos}/>
                <Route path="/pricing" component={OwnerPricing}/>
                <Route path="/currency" component={OwnerCurrency}/>
                <Route path="/searchresults" component={SearchResults}/>
                <Route path="/viewevent" component={TravelerPropertyDetails}/>
                <Route path="/mytrips" component={MyTrips}/>
                <Route path="/ownerdashboard" component={OwnerDashboard}/>
                <Route path="/travelerinboxlistings" component={TravelerInboxListings}/>
                <Route path="/travelerinbox" component={TravelerInbox}/>
                <Route path="/ownerinboxlistings" component={OwnerInboxListings}/>
                <Route path="/ownerinbox" component={OwnerInbox}/>

            </div>
        )
    }
}
//Export The Main Component
export default Main;
