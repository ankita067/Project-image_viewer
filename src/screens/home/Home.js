import React, { Component } from 'react';
import './Home.css';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
// import Modal from 'react-modal';
// import Menu from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { withStyles } from '@material-ui/core/styles';

const customStyles = {
    content: {
        top: '60%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export function CustomizedMenus() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
}


class Home extends Component {
    constructor() {
        super();
        this.state = {
            isUserMenuOpen: false,
            acess_token: sessionStorage.getItem("access-token"),
            isLoggedIn: false,
            userdata: [
                {
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
            ],
            allImages: [
                {
                    id: "",
                    user: [
                        {
                            id: "",
                            full_name: "",
                            profile_picture: "",
                            username: ""
                        }
                    ],
                    images: [
                        {

                        }
                    ],
                    created_time: "",
                    caption: [],
                    user_has_liked: false,
                    likes: {
                        count: ""
                    }
                    ,
                    tags: [

                    ],
                    filter: "",
                    comments: {
                        count: ""
                    },
                    type: "",
                    link: "",
                    location: {},
                    attribution: [],
                    users_in_photo: []

                }
            ]
        };
    }
    // const [anchorEl, setAnchorEl] = React.useState(null);
    IconButtonClickHandler = (e) => {
        // this.props.togglePopover();
        // this.setAnchorEl(e.currentTarget);
        this.setState({ isUserMenuOpen: true })
    }

    handleClose = (e) => {
        // this.props.togglePopover();
        // this.setAnchorEl(null);
        this.setState({ isUserMenuOpen: false })
    }


    UNSAFE_componentWillMount() {



        let that = this;
        let Userdata = null;
        let xhrUser = new XMLHttpRequest();
        xhrUser.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                that.setState({
                    userdata: JSON.parse(this.responseText).data,
                    isLoggedIn: true
                });

            }
        });

        xhrUser.open("GET", this.props.baseUrl + "users/self/?access_token=" + this.state.acess_token);
        xhrUser.setRequestHeader("Cache-Control", "no-cache");
        xhrUser.send(Userdata);


        //Get Profile Picture 

        let allimages = null;
        let xhrAllImages = new XMLHttpRequest();
        xhrAllImages.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                //alert(JSON.parse(this.responseText).data);
                that.setState({
                    allImages: JSON.parse(this.responseText).data
                });
                // console.log(that.state.allImages   );
            }
        });
        xhrAllImages.open("GET", this.props.baseUrl + "users/self/media/recent?access_token=" + this.state.acess_token);
        xhrAllImages.setRequestHeader("Cache-Control", "no-cache");
        xhrAllImages.send(allimages);

    }



    render() {
        let isLoggedIn = this.state.isLoggedIn;
        const renderProfilePicture = () => {
            if (isLoggedIn === "undefined") {
                return "";
            } else {
                return <img src={this.state.userdata.profile_picture} className="ProfileIcon" alt={this.state.userdata.full_name} />

            }
        }
        return (
            <div>

                <div className="logo-Header">
                    <div className="logo">Image Viewer</div>
                    <div className="search">
                        <span className="searchIcon"><SearchIcon /></span>
                        <input type="text" className="input" placeholder="Search..." />
                    </div>

                    <div className="userImage">
                        <IconButton onClick={this.IconButtonClickHandler}>
                            {renderProfilePicture()}
                        </IconButton>
                        <StyledMenu
                            id="customized-menu"
                            // anchorEl={anchorEl}
                            keepMounted
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            open={this.state.isUserMenuOpen}
                            onClose={this.handleClose}
                        >
                            <StyledMenuItem>
                                {/* <ListItemIcon>
                                    <SendIcon fontSize="small" />
                                </ListItemIcon> */}
                                <ListItemText primary="My Account" />
                            </StyledMenuItem>
                            <StyledMenuItem>
                                {/* <ListItemIcon>
                                    <DraftsIcon fontSize="small" />
                                </ListItemIcon> */}
                                <ListItemText primary="LogOut" />
                            </StyledMenuItem>
                            
                        </StyledMenu>

                    </div>
                    <div>


                    </div>

                </div>





            </div>
        )


    }
}

export default Home;