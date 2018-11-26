import React,{Component} from 'react';
import NavBarBlue from '../NavBarBlue/NavBarBlue';
import axios from 'axios';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {storemessage} from "../../actions" 
import {fetchmessagethreaddetails} from "../../actions"
import swal from 'sweetalert'
import jwtdecode from 'jwt-decode';


class TravelerInbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message : '',
            mid : '',
            username :"",
            token : false,
            messagethreaddetails : []
        }
        this.onChange = this.onChange.bind(this);
        this.sendmessage = this.sendmessage.bind(this);
    
    }

    onChange(e) {
        console.log(this.state.username + ' : ' + e.target.value)
        this.setState({          
            message:  this.state.username + ' : ' + e.target.value
        })
        console.log("this.state.message in onchange", this.state.message)
    }

componentWillMount(){
    console.log("Token in did mount" + localStorage.getItem("usertoken"))
        if(localStorage.getItem("usertoken")){
            var tokenvalue = jwtdecode(localStorage.getItem("usertoken"));
            console.log("decoded  " + tokenvalue)
            this.setState({
                token: true,
                username: tokenvalue.user.firstname
            })
        }
}

    sendmessage = async  (e) => {
        console.log("In send msg" +  this.state.message)

        // preventDefault()
        var values = {
            tid : this.state.mid,
            messagethread: this.state.message,
            firstFlag : false
        }
        
        console.log("values" + values.tid + values.message)

        await this.props.storemessage(values)
        await this.setState({
            messagestoreFlag : this.props.messagestoreFlag
        })
        if (this.state.messagestoreFlag == true)
        {
            swal("Message sent","Refresh to view message thread","success")
        }
    }



    componentWillReceiveProps(nextProps) {
        console.log("NEXTPROPS!" + JSON.stringify(nextProps))
        console.log("msg thread in cwrp" + JSON.stringify(nextProps.getmessagethread))
        
        console.log("msg thread in cwrp cehcking" + JSON.stringify(nextProps.getmessagethread._id))
        this.setState({
            messagethreaddetails: nextProps.getmessagethread

        })
    }

    componentDidMount(){
        console.log("Inside inbox cdm")
        var mid = this.props.history.location.pathname.substring(15)
        console.log(mid)
        this.setState({
            mid : mid
        })
        this.props.fetchmessagethreaddetails(mid);
    }

    render() {
        let details = this.state.messagethreaddetails.map((message, i) => {
            return (
                <div>
                    <span> {message}</span>
                    <hr></hr>
                </div>
            )
        })
        return (
            <div>
            <NavBarBlue></NavBarBlue>
           <div className="container">
                    <h3>Your Messages</h3>
                    <div className="jumbotron">
                        
                           {details}
                            <div className="row">
                              {/* <form onSubmit={this.sendmessage}>  */}
                                <textarea onChange={this.onChange} placeholder='Send a Message to Owner' />

                                <button className="send-msgs btn btn-success" onClick={this.sendmessage} >Send Message </button>
                              {/* </form>  */}
                                </div>
                        </div>
                    </div>
                </div>
                );
            }
}


const mapStateToProps = state => ({
    getmessagethread: state.messagereducer.getmessagethread.messagethread,
    getmessagethreadFlag : state.messagereducer.getmessagethreadFlag,
    messagestoreFlag : state.messagereducer.messagestoreFlag
});

export default connect(mapStateToProps, {fetchmessagethreaddetails, storemessage})(TravelerInbox);