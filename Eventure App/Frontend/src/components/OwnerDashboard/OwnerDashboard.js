import React,{Component} from 'react';
import NavBarBlue from '../NavBarBlue/NavBarBlue';
import axios from 'axios';
import cookie from 'react-cookies'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getownerdashboard } from "../../actions";
import './OwnerDashboard.css'
import _ from 'lodash'
import store from '../../index.js'


//create the sidebar Component
class OwnerDashboard extends Component {
    constructor(props){
        super(props);  
        this.state = {
            dashboarddata : [],
            current : 1,
            itemsPerPage : 5,
            activePage : 1
        };
        this.clickHandler = this.clickHandler.bind(this)
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState({
             dashboarddata : this.state.dashboarddata.concat(nextProps.bookings)
           })

    }

    
    handleSearch = (e) => {
        if(e.target.value)
        {
        let newlyDisplayed = _.filter(this.state.dashboarddata, booking => booking.headline.toLowerCase().includes(e.target.value.toLowerCase()))
        console.log("Newly Displayed " + JSON.stringify(newlyDisplayed))
        this.setState({
           dashboarddata: newlyDisplayed
        })
        }
        else{
            this.setState({ 
                dashboarddata : this.props.bookings
            })
           
        }
}

handleSearchStartDate = (e) => {
    if(e.target.value)
    {
    let filteredresult = _.filter(this.state.dashboarddata, booking => booking.bookedstartdate == e.target.value)
    console.log("Filtered result " + JSON.stringify(filteredresult))
    this.setState({
        dashboarddata: filteredresult
    })
    }
    else{
        this.setState({ 
            dashboarddata : this.props.bookings
        })
       
    }
}

handleSearchEndDate = (e) => {
    if(e.target.value)
    {
    let filteredresult = _.filter(this.state.dashboarddata, booking => booking.bookedenddate ==e.target.value)
    console.log("Filtered result " + JSON.stringify(filteredresult))
    this.setState({
        dashboarddata: filteredresult
    })
    }
    else{
        this.setState({ 
            dashboarddata : this.props.bookings
        })
       
    }
}


     async componentDidMount(){
        console.log("Inside component did mount")
        await this.props.getownerdashboard();
           /*  axios.get('http://localhost:3001/getownerdashboard/' + data.oemailid)
                .then(response => { */
                    console.log(store.getState().ownerdashboardreducer)
            //   this.setState({
              //  dashboarddata : this.state.dashboarddata.concat(this.props.bookings)
             //})
           /*  }); */    
    }

    clickHandler(event) {
        this.setState({
            current: Number(event.target.id)
        });
      }

    render()
    {

        const { current, itemsPerPage } = this.state;
        const lastpageindex = current * itemsPerPage;
        const firstpageindex = lastpageindex - itemsPerPage;
        const paginatedbookings = this.state.dashboarddata.slice(firstpageindex, lastpageindex);
        console.log("Number of properties : " + this.state.dashboarddata.length);
        
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.dashboarddata.length / itemsPerPage); i++) {
          pageNumbers.push(i);
        }

    const showPageNumbers = pageNumbers.map(number => {
        return (
          <li class="page-item active"
            key={number}
            id={number}
            onClick={this.clickHandler}
            className="page-item nums">
            {number}
          </li>
        );
      });

        let details = paginatedbookings.map((data,i) => {
            return(
                
                <table >
                <tbody class="tableprops">
                <tr key={i}>
                    <div class = "container list-props">
                    <div><td><h2>{data.headline}</h2></td></div>
                    <div><td>Location : {data.location}</td></div>
                    <div><td>Booked from : {data.bookedstartdate}</td></div>
                    <div><td>Booked till :{data.bookedenddate}</td></div>
                    <div><td>Price : {data.price}</td></div>
                    <div><td>Booked by : {data.temailid}</td></div> 
                    </div> 
                    <br></br>
                </tr>
                </tbody>
                </table>
            )
        })

        return(
            <div>
            <NavBarBlue></NavBarBlue>
            <div class="container">
                    <h2>Owner's Dashboard</h2>  

                     <div>
                        <br></br>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                    <label>Filter your property </label>
                    <input class="form-control2" type="text" placeholder="Search" aria-label="Search" onChange = {this.handleSearch}/>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <label>Filter start date </label>
                    <input class="form-control2" type="date" label = "Filter Start Date" aria-label="Search" onChange = {this.handleSearchStartDate}/>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <label>Filter end date </label>
                    <input class="form-control2" type="date" label = "Filter End Date" aria-label="Search" onChange = {this.handleSearchEndDate}/>
                {/*  <input class="form-control" type="text" placeholder="Search" aria-label="Search" onChange = {this.handleSearch}/>
                    <input class="form-control" type="date" placeholder="Search" aria-label="Search" onChange = {this.handleSearch}/> */}
                    {/* </div> */}
                    </div>

                    <br/>
                    <div className = "flex-container-ownerdasboard">                  
                         {details} 
                    </div>

                    <nav aria-label="...">
                    <ul class="pagination">
                    {showPageNumbers}           
                    </ul>
                    </nav>
                                       
             </div> 
            </div>
        )
    }

}

const mapStateToProps = state =>{
    console.log("state" + state.ownerdashboardreducer )
    return {
        bookings : state.ownerdashboardreducer.bookings
    }
}

export default connect(mapStateToProps, {getownerdashboard})(OwnerDashboard);