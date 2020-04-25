import React, { Component } from 'react';
import './Profile.css';
import CustomizedMenus from '../../common/Menu';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import FormHelperText from '@material-ui/core/FormHelperText';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import ImageHeader from '../../common/ImageHeader';
import ImageMedia from '../../common/ImageMedia';
import ImageCaption from '../../common/ImageCaption';
import ImageLike from '../../common/ImageLike';
import ImageComment from '../../common/ImageComment';




const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '10%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },

};

const customStyles1 = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },

};







class Profile extends Component {


    constructor(props) {
        super(props);
        this.state = {
            userdata: [
                {
                    id: "",
                    username: "",
                    profile_picture: "",
                    full_name: "",
                    bio: "",
                    website: "",
                    is_business: "",

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
                    images: {
                        thumbnail: {
                            width: "",
                            height: "",
                            url: ""
                        },
                        low_resolution: {
                            width: "",
                            height: "",
                            url: ""
                        },
                        standard_resolution: {
                            width: "",
                            height: "",
                            url: ""
                        }
                    },
                    created_time: "",
                    caption: {
                        id: "",
                        text: "",
                        created_time: "",
                        from: {
                            id: "",
                            full_name: "",
                            profile_picture: "",
                            username: ""
                        }
                    },
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
                    location: {
                        latitude: "",
                        longitude: "",
                        name: "",
                        id: ""
                    },
                    attribution: [],
                    users_in_photo: []

                }
            ],
            usercounts: {
                media: "",
                follows: "",
                followed_by: ""
            },

            comments: [
                {
                    imageid: "",
                    username: "",
                    commenttext: ""
                }
            ],
            commentData: "",
            imageid: "",


            IsProfile: true,
            modalIsOpen: false,
            fullNameRequired: "dispNone",
            fullname: "",
            modalIsOpen1: false,
            selectedImageId: ""


        };
    }



    UNSAFE_componentWillMount() {
        this.setState({ history: this.props.history });
        let that = this;
        let Userdata = null;
        let xhrUser = new XMLHttpRequest();
        xhrUser.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                that.setState({
                    userdata: JSON.parse(this.responseText).data,
                    usercounts: JSON.parse(this.responseText).data.counts,
                    isLoggedIn: true
                });

            }
        });

        xhrUser.open("GET", this.props.baseUrl + "users/self/?access_token=" + sessionStorage.getItem("access-token"));
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
        xhrAllImages.open("GET", this.props.baseUrl + "users/self/media/recent?access_token=" + sessionStorage.getItem("access-token"));
        xhrAllImages.setRequestHeader("Cache-Control", "no-cache");
        xhrAllImages.send(allimages);
    }

    BackToHomePage = () => {
        this.props.history.push('/Home/');
    }

    openModalHandler = () => {
        this.setState({ modalIsOpen: true })
    }

    openModalHandler1 = (e) => {
        this.setState({ selectedImageId: e.target.id })
        this.setState({ modalIsOpen1: true })
    }

    closeModalHandler = () => {
        this.setState({ modalIsOpen: false })
    }
    UpdateClickHandler = () => {


        this.state.fullname === "" ? this.setState({ fullNameRequired: "dispBlock" }) : this.setState({ fullNameRequired: "dispNone" });
        if (this.state.fullname !== "") {
            this.state.userdata.full_name = this.state.fullname;
            this.setState({ modalIsOpen: false })
        }
    }
    inputUsernameChangeHandler = (e) => {
        this.setState({ fullname: e.target.value });
    }

    closeModalHandler1 = () => {
        this.setState({ modalIsOpen1: false })
    }

    inputUsernameChangeHandler1 = (e) => {
        this.setState({ fullname: e.target.value });
    }


    commentText = (e) => {
        this.setState({ commentData: e.target.value });
    }

    AddCommentHandler = (e) => {

        if (this.state.commentData !== "") {
            let newComment =
                { imageid: e.currentTarget.id, username: this.state.userdata.username, commenttext: this.state.commentData }
            this.setState({

                comments: [...this.state.comments, newComment]

            })


        }



    }


    render() {




        return (
            <div>

                <div>
                    <div className="logo-Header">

                        <div className="logo" onClick={this.BackToHomePage}>Image Viewer</div>


                        <div className="AfterLogin">

                            <div className="userImage">
                                <CustomizedMenus variant="conatined" {...this.state} />
                            </div>
                        </div>

                    </div>
                </div>

                <div className="ContentDiv">
                    <div className="AccountInformation">
                        <div className="BodyPart">

                            <div className="as">
                                <img className="ProfilePicture" src={this.state.userdata.profile_picture}></img>
                                <div className="UserInformation">
                                    <div className="username">
                                        <p className="font">{this.state.userdata.username}</p>

                                    </div>

                                    <div className="NumberOfPosts">
                                        <div className="posts">
                                            <Typography> Posts: {this.state.usercounts.media}</Typography>
                                        </div><br />
                                        <div className="follows">
                                            <Typography>Follows: {this.state.usercounts.follows}</Typography>
                                        </div><br />
                                        <div className="followers">
                                            <Typography>Followed By: {this.state.usercounts.followed_by}</Typography>
                                        </div>

                                    </div>

                                    <div className="fullNameDiv">
                                        <div className="fullName">
                                            <Typography>{this.state.userdata.full_name}</Typography>


                                        </div>

                                        <div className="Editbtn">
                                            <Button

                                                variant="contained"
                                                color="secondary"
                                                className="ProfileIcon"
                                                onClick={this.openModalHandler}
                                            >
                                                <EditIcon />

                                            </Button>

                                        </div>
                                        <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} contentLabel="Edit"
                                            onRequestClose={this.closeModalHandler}
                                            style={customStyles1}>



                                            <FormControl required>

                                                <Typography>Edit</Typography>
                                                <Input id="fullname" type="text" fullname={this.state.fullname} onChange={this.inputUsernameChangeHandler} placeholder="Full Name" />
                                                <FormHelperText className={this.state.fullNameRequired}>
                                                    <span className="red">required</span>
                                                </FormHelperText><br /><br />


                                                <Button variant="contained"
                                                    color="primary" onClick={this.UpdateClickHandler} >Update</Button>



                                            </FormControl>





                                        </Modal>



                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>

                        <GridList cellHeight={250} cols={3}   >

                            {this.state.allImages.map(image => (

                                <GridListTile className="GridListItems" key={image.id}>

                                    <img src={image.images.standard_resolution.url} id={image.id} className="movie-poster" alt={image.id} onClick={this.openModalHandler1} />

                                    {/* <GridListTileBar title={movie.title} /> */}

                                </GridListTile>

                            ))}

                        </GridList>

                    </div>
                </div>
                <div>
                    <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen1} contentLabel="Edit"
                        onRequestClose={this.closeModalHandler1} style={customStyles}>


                        {this.state.allImages.filter(image => image.id === this.state.selectedImageId).map(image => (
                            <div className="imageDetails" key={image.id}>
                                <Card key className="ModalContent">
                                    <div className="left-content" key={image.id}>
                                        <ImageMedia url={image.images.standard_resolution.url}></ImageMedia>
                                    </div>
                                    <div className="right-content" >
                                        <div className="imageheader">
                                            <ImageHeader profile_picture={image.user.profile_picture}
                                                full_name={image.user.full_name}
                                                created_time={image.created_time}
                                            ></ImageHeader><hr />
                                        </div>


                                        <ImageCaption caption={image.caption.text} tags={image.tags} captionid={image.id}>

                                        </ImageCaption>

                                        <CardContent>
                                            <ImageComment comments={this.state.comments.filter(comment => {
                                                return comment.imageid === image.id;
                                            })} commentid={image.id} user={this.state.userdata.username}></ImageComment>

                                        </CardContent>
                                        <div className="commentsBox">

                                            <ImageLike IsImageLiked={image.user_has_liked} likescount={image.likes.count}>

                                            </ImageLike>

                                            <CardActions>

                                                <TextField id={this.props.commentid} value={this.state.commentData} label="Add a comment" onChange={this.commentText} />
                                                <Button id={image.id} variant="contained" color="primary" onClick={this.AddCommentHandler}>
                                                    Add</Button>


                                            </CardActions>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))}



                    </Modal>
                </div>

            </div>

        )
    }
}


export default Profile;