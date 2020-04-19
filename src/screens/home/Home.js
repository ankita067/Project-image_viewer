import React, { Component } from 'react';
import './Home.css';

import SearchIcon from '@material-ui/icons/Search';
//import TextField from '@material-ui/core/TextField';
//import InputLabel from '@material-ui/core/InputLabel';
//import Input from '@material-ui/core/Input';
//import SearchIcon from '@material-ui/icons/Search';
//import AppBar from '@material-ui/core/AppBar';
//  import FormControl from '@material-ui/core/FormControl';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
 
// import { fade, makeStyles } from '@material-ui/core/styles';
 import Typography from '@material-ui/core/Typography';






class Home extends Component {
    constructor() {
        super();
        this.state = {
            User: {
                data: {
                    id: "",
                    username: "",
                    profile_picture: "",
                    full_name: "",
                    bio: "",
                    website: "",
                    is_business: "",
                    counts: {
                        media: "",
                        follows: "",
                        followed_by: ""
                    },
                    meta: {
                        code: ""
                    }
                }
            },
            acess_token: sessionStorage.getItem("access-token")
        };
    }

    UNSAFE_componentWillMount() {

        let that = this;
        let Userdata = null;
        let xhrUser = new XMLHttpRequest();
        xhrUser.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                that.setState({
                    User: JSON.parse(this.responseText)
                });

            }
        });

        xhrUser.open("GET", this.props.baseUrl + "users/self/?access_token=" + this.state.acess_token);
        xhrUser.setRequestHeader("Cache-Control", "no-cache");
        xhrUser.send(Userdata);
    }



    render() {
        return (
            <div>
                
                <div className="logo-Header">
               
                    <div className="logo">Image Viewer</div>

                    
                    <div className="search">
                        <span className="searchIcon"><SearchIcon /></span>                   
                        <input type="text" className="input"  placeholder="Search..." />
                    </div>
                    <div className="userImage"></div>
                   
                </div>
                


            </div>
        )


    }
}

export default Home;