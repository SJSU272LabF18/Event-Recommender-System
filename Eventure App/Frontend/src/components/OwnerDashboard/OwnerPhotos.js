import React,{Component} from 'react';
import NavBarBlue from '../NavBarBlue/NavBarBlue';
import axios from 'axios';
import {Redirect} from 'react-router';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { submitPhotos } from "../../actions";
import './SideBar.css'


//create the sidebar Component
class OwnerPhotos extends Component {
    constructor(props){
        super(props);  
        this.state = {
            description: '',
            /* selectedFile: '', */
             selectedFile : [], 
             images : ''
          };
          this.onChange = this.onChange.bind(this);
          this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        //   console.log(nextProps);
       }

    onChange = (e) => {
        console.log("Inside onchange")
        console.log(e.target.files);
        if(e.target.name == 'selectedFile'){
          this.setState({
            selectedFile: e.target.files
          })
          
        }else{
          this.setState({ 
              [e.target.name]: e.target.value
             });
        }
    }
  
    onSubmit = (e) => {
        console.log("Inside onSubmit");
      e.preventDefault();
      console.log("files-" + Object.keys(this.state.selectedFile).length);
      const { description, selectedFile} = this.state;
      let formData = new FormData();
      formData.append('description', description);
      for(let i = 0 ; i < Object.keys(this.state.selectedFile).length ; i++)
      {
      formData.append('selectedFile', selectedFile[i]);
      }

        axios.post('http://localhost:3001/photos', formData)
          .then((result) => {
            var values = {
                oemailid : document.cookie.substring(7),
                images : result.data
            }
            this.props.submitPhotos(values, () => {
                console.log("Inside submit photos");
              });
          });
  
    }

    render()
    {
        let redirectVar = null;
        if(this.props.photosAddedFlag === true){
          redirectVar = <Redirect to= "/pricing"/>
        }
        const { description, selectedFile } = this.state;
        return(
            <div>
            {redirectVar}
            <NavBarBlue></NavBarBlue>
            
            <div className = "main-div-sidebar row">

            <div className = "col-lg-3 vertical-menu-owner">
            <h4>Welcome</h4>
            <Link to="/location">Location</Link>
            <Link to="/details">Details</Link>
            <Link to="/photos">Photos</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/ownerdashboard">Dashboard</Link>
            </div>
            
            <div className="container col-lg-9">
                <div className = "location-form">

                <div class="checklist-header-container ">
                <h4><span>Add upto 5 photos of your property</span></h4><hr/>
                </div>
                <form onSubmit={this.onSubmit}>
                 <div class="photos-drop-inside">
                    <h2 class="photo-drop-title text-muted">Drop photos here</h2>
                    <h2 class="photo-drop-OR text-muted">or</h2>
                   
                 <div><label  for="uploadPhotoInput" name="description" value={description}
                    onChange={this.onChange} multiple class="photo-drop-button btn btn-default center-block">Select Photos to Upload</label>
                 <input type="file" id="uploadPhotoInput" multiple name="selectedFile" onChange={this.onChange}/>
                 </div>

                 <h2 class="photo-drop-error text-muted">Only JPEG images are supported</h2>
                 <div class="photo-drop-info small text-muted">0 of 50 uploaded. 6 are required. You can choose to upload more than one photo at a time.
                 </div>

                 </div>
               

             <div>
                <button type="submit" className="btn btn-primary btn-next"> Next</button> 
             </div>
            
           </form>
        

             </div>
            </div>
            
            </div>

            </div>
        )
    }

}

const mapStateToProps = state =>{
    return {
        photosAddedFlag : state.addpropertyreducer.photosAdded
    }
}

export default connect(mapStateToProps, {submitPhotos})(OwnerPhotos);