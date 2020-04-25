import React, { Component } from 'react';
import CardActions from '@material-ui/core/CardActions';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';



class ImageLike extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isImageLiked:false,
            likeCount:this.props.likescount

        }
    }
    UNSAFE_componentWillMount() {
        this.setState({isImageLiked : this.props.IsImageLiked});
        this.setState({likeCount: this.props.likescount})
    }
    LikeClickHandler = (e) => {
        if(this.props.IsImageLiked===true)
        {
            this.setState({isImageLiked:false});
        this.setState({likeCount: this.props.likescount +1});
        }
    }

    render() {
        
        return (<div>
            <CardActions disableSpacing>
                
                <IconButton aria-label="likes" onClick={this.LikeClickHandler}>
                    {this.state.isImageLiked !== true &&
                        <Favorite style={{ color: red[500] }} />
                    }
                    {this.state.isImageLiked === true &&
                        <FavoriteBorder />
                    }

                </IconButton>

                <div>{this.state.likeCount} Likes</div></CardActions>
        </div>
        )
    }
}
export default ImageLike;