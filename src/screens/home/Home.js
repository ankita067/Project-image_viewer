import React, { Component } from 'react';
import './Home.css';
import Card from '@material-ui/core/Card';
import ImageHeader from '../../common/ImageHeader'
import ImageMedia from '../../common/ImageMedia'
import ImageCaption from '../../common/ImageCaption'
import ImageLike from '../../common/ImageLike'
import CardContent from '@material-ui/core/CardContent';
import CustomizedMenus from '../../common/Menu'
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import ImageComment from '../../common/ImageComment';







class Home extends Component {

    constructor(props) {
        super(props);
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
                    created_time: 0,    
                    caption: {
                        id: "",
                        text: "",
                        created_time: 0,
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
            history: "",
            search: "",
            comments: [
                {
                    imageid: "",
                    username: "",
                    commenttext: ""
                }
            ],
            commentData: "",
            imageid: "",
        };
    }



    logoutHandler = (e) => {
        sessionStorage.removeItem("access-token");
        this.setState({
            loggedIn: false
        });

        this.props.history.push('/');
    }

    IconButtonClickHandler = (e) => {

        this.setState({ isUserMenuOpen: true })
    }

    handleClose = (e) => {

        this.setState({ isUserMenuOpen: false })
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
                    isLoggedIn: true
                });

            }
        });

        xhrUser.open("GET", this.props.baseUrl + "users/self/?access_token=" + this.state.acess_token);
        xhrUser.setRequestHeader("Cache-Control", "no-cache");
        xhrUser.send(Userdata);


       

        let allimages = null;
        let xhrAllImages = new XMLHttpRequest();
        xhrAllImages.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                
                that.setState({
                    allImages: JSON.parse(this.responseText).data
                });
                
            }
        });
        xhrAllImages.open("GET", this.props.baseUrl + "users/self/media/recent?access_token=" + this.state.acess_token);
        xhrAllImages.setRequestHeader("Cache-Control", "no-cache");
        xhrAllImages.send(allimages);

    }
    SearchHandle = (e) => {
        this.setState({ search: e.target.value });
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
                <div className="logo-Header">

                    <div className="logo">Image Viewer</div>
                    <div className="search">
                        <span className="searchIcon"><SearchIcon /></span>
                       

                        <input type="text" className="input" placeholder="Search..." onChange={this.SearchHandle} />
                    </div>
                    {this.state.isLoggedIn === true &&
                        <div className="AfterLogin">

                            <div className="userImage">
                                <CustomizedMenus {...this.state} />
                            </div>
                        </div>
                    }
                </div>

                
                <div className="allimages">
                    {this.state.allImages.filter(image1 => {
                        return image1.caption.text.toString().toLowerCase().indexOf(this.state.search.toString().toLowerCase()) !== -1;
                    }).map(image => (
                        <div className="CardContent" key={image.id}>
                            <div className="as">
                                <Card className="">
                                    <div className="Card">
                                        <ImageHeader profile_picture={image.user.profile_picture}
                                            full_name={image.user.full_name}
                                            created_time={image.created_time}
                                        ></ImageHeader>

                                        <ImageMedia url={image.images.standard_resolution.url}></ImageMedia>

                                        <hr width="60%" />

                                        <ImageCaption caption={image.caption.text}>

                                        </ImageCaption>

                                        <ImageLike IsImageLiked={image.user_has_liked} likescount={image.likes.count}>

                                        </ImageLike>


                                       <CardContent>
                                            <ImageComment comments={this.state.comments.filter(comment => {
                                                return comment.imageid === image.id;
                                            })} commentid={image.id} user={this.state.userdata.username}></ImageComment>

                                       </CardContent>


                                        <CardActions>
                                            <div>
                                                <TextField id={this.props.commentid} label="Add a comment" onChange={this.commentText} />
                                                <Button id={image.id} variant="contained" color="primary" onClick={this.AddCommentHandler}>
                                                    Add</Button>
                                            </div>

                                        </CardActions>

                                    </div>
                                </Card>
                            </div>
                        </div>

                    ))}
                </div>




            </div>
        )


    }
}

export default Home;