import React,{Component} from 'react';
import NavBarBlue from '../NavBarBlue/NavBarBlue';
import axios from 'axios';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { searchProperties } from "../../actions";
import { fetchpropertydetails } from "../../actions";
import { bindActionCreators } from 'redux';
import _ from 'lodash'
import './Recommendations.css'
import swal from 'sweetalert'
import {geolocated} from 'react-geolocated';
import { values } from 'redux-form';

//create the sidebar Component
class Recommendations extends Component {
    constructor(props){
        super(props);  
        this.state = {
            propertiesdata : [],
            imageView : [],
            current : 1,
            itemsPerPage : 10,
            activePage : 1,
            latitude : '',
            longitude : ''
        };
        this.handleViewPropertyDetails = this.handleViewPropertyDetails.bind(this);
        this.clickHandler = this.clickHandler.bind(this)
    }

    

    componentWillReceiveProps(nextProps) 
    {
        console.log("Fetch flag in search results " + nextProps.fetchproperty.length)
    }


    async componentDidMount(){
        const values = {
            latitude : localStorage.getItem('Latitude'),
            longitude : localStorage.getItem('Longitude'),
        }
        console.log("values" + values.latitude + values.longitude)
        await axios.post('http://localhost:3001/getevents', values)
        .then(response => {
            if(response.status == 200){
                this.setState({
                    searched : true,
                    propertiesdata : this.state.propertiesdata.concat(response.data)
                })
                console.log(this.state.propertiesdata[1])

            }else{
                this.setState({
                    searched : false
                })
            }
        })   

        console.log(this.state.propertiesdata)
        if(this.state.propertiesdata.length === 0)
        {   
            swal("No data found","Please recheck your search criteria","warning")
        }
        else{
        for (let i = 0; i < this.state.propertiesdata.length; i++) {
            axios.post('http://localhost:3001/download/' + this.state.propertiesdata[i].picturelist.split(',')[0])
                .then(response => {
                    let imagePreview = 'data:image/jpg;base64, ' + response.data;
                    
                    var propertyArr = this.state.propertiesdata.slice();
                    propertyArr[i].picturelist = imagePreview;
                    this.setState({
                        propertiesdata: propertyArr
                    });
                });
        }
     }
        
        
    }

    handleViewPropertyDetails = (pid,e) => 
    {
        console.log("id" + pid);
        var values = pid;
        this.props.fetchpropertydetails(values);
    }


    clickHandler(event) {
        this.setState({
            current: Number(event.target.id)
        });
      }

    render()
    {

        const { current, itemsPerPage } = this.state;
        const indexOfLastPage = current * itemsPerPage;
        const indexOfFirstPage = indexOfLastPage - itemsPerPage;
        const paginatedproperties = this.state.propertiesdata.slice(indexOfFirstPage, indexOfLastPage);
        
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.propertiesdata.length / itemsPerPage); i++) {
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
  
        let details = paginatedproperties.map((data,i) => {
            return(

                <table class="table">
                <tbody>
                <tr key={i}>
                    <div class = "container list-props">
                   
                    <div  class="row jumbotron-traveler">
                    <div class="column left"> 
                    <div><img class="imagesearch" src = {data.picturelist}/></div> 
                    </div>

                    <div class="column right container container-traveler">
                    <div><td><h3><Link to = "/viewevent" onClick = {this.handleViewPropertyDetails.bind(this,data._id)}> {data.eventname} </Link></h3></td></div>
                    <div><td>&nbsp;&nbsp;{data.eventcitystate}</td></div>
                    </div>
                    </div>

                    </div> 
                </tr>
                </tbody>
                </table>
                
            )
        })

        return(
            <div>
            <NavBarBlue></NavBarBlue>

            <div class="container">
                    <h2>List of Available Properties</h2>    

            {/* <div class = "navbarborder">
    <div class="collapse navbar-collapse">
    <li class="dropdown  fontprop menu-items">
    <Link to="#" class="dropdown-toggle" data-toggle="dropdown"><font color="black">Price</font></Link> 
        
    <ul class="dropdown-menu nav navbar-nav pull-left">  
               <div className="slider width">
                <span className="slidetxt">$0 to {this.state.pricefilter}</span>
                <input class="slider" type="range" min="0" max="1000" step="1" value={this.state.pricefilter} onChange={this.handlepricefilter}/>
               </div>
               </ul>
               </li>
               <li class="dropdown  fontprop menu-items1">
               <Link to="#" class="dropdown-toggle" data-toggle="dropdown"><font color="black">Bedrooms</font></Link> 
               <ul class="dropdown-menu"> 
               <div className="slider width">
               <span className="slidetxt">{this.state.bedroomfilter}</span>
                <input class="slider" type="range" min="0" max="10" step="1" value={this.state.bedroomfilter} onChange={this.handlebedroomfilter}/> 
                </div>
                </ul>
                </li>
                <button onClick = {this.handleFilter} className="btn btn-primary a" type="submit">Filter</button>
                
                </div>
    </div>      */}

                         {details}      

                                       
             </div> 
                {/* {showPageNumbers} */}
                <nav aria-label="...">
                <ul class="pagination">
                    {showPageNumbers}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </ul>
                </nav>
            </div>
        )
    }

}



const mapStateToProps = state =>{
    console.log("search flag!" + state.fetchpropertyreducer.fetchFlag)
    return {
        searchFlag : state.searchpropertiesreducer.searchFlag,
        searchresults : state.searchpropertiesreducer.searchresults,
        fetchproperty : state.fetchpropertyreducer.fetchproperty, //checking
        fetchFlag : state.fetchpropertyreducer.fetchFlag          //checking
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ searchProperties, fetchpropertydetails }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Recommendations);
