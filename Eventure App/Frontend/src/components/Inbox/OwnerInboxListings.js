import React,{Component} from 'react';
import NavBarBlue from '../NavBarBlue/NavBarBlue';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {fetchmessagelist} from  "../../actions";
import {fetchmessagethreaddetails} from  "../../actions";
import jwtdecode from 'jwt-decode';


class OwnerInboxListings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messagelistdata : []
        }
        this.handleViewMessageDetails = this.handleViewMessageDetails.bind(this);

    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.messagelist)
        this.setState({
            messagelistdata :this.state.messagelistdata.concat(nextProps.messagelist)
        })
    }

    componentDidMount(){
        console.log("Inside cdm inbox first pg ")
        this.props.fetchmessagelist()
/*         console.log(this.props.messagelist)
        this.setState({
            messagelistdata :this.state.messagelistdata.concat(this.props.messagelist)
        }) */
        
       
    }

    handleViewMessageDetails = (tid,e) => 
    {
        console.log("Message thread id" + tid);
        var values = tid;
       /*  this.props.fetchmessagethreaddetails(values); */
    }

    render() {
        console.log("this" + this.state.messagelistdata)
         let details = this.state.messagelistdata.map((message, i) => {
            return (
                <div  key={i}>
               
                <span> <Link to={`/ownerinbox/${message._id}`} onClick = {this.handleViewMessageDetails.bind(this,message._id)}>{message.temailid}</Link></span><br></br>
                <span>For property: {message.headline}</span><br></br>  
                <hr></hr>   
                </div>

            )
        }) 
        return (
        <div>
            <NavBarBlue/>

            <h3>Your Messages</h3>
            <div className="container">
            <div className="jumbotron">
                    <div className="rows-inbox">
                    {details}
                    </div>
                </div>
            </div>
        </div>
        );
    }
}


const mapStateToProps = state => ({
    messagelist: state.messagereducer.messagelist
});

export default connect(mapStateToProps, { fetchmessagelist,fetchmessagethreaddetails })(OwnerInboxListings);