import React, { Component } from 'react';
import './ImageComment.css'

import Typography from '@material-ui/core/Typography';

class Comment extends React.Component {
	render(){
		return (
			<Typography className='comment'>
				
				<span className='comment-author'>
					{this.props.author} : 
				</span>
                <span className='comment-body'>
					{this.props.children}
				</span>
			</Typography>
		)
	}
}
class ImageComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentData: "",
            commentUser: this.props.user

        }
    }

    
    commentText = (e) => {
        this.setState({ commentData: e.target.value });
    }

    render() {
        // var i=0;
        var commentNodes = this.props.comments
			.map(function(comment){
				return (
					<Comment  author={comment.username} key={comment.imageid}>
						{comment.commenttext}
					</Comment>
                    
				);
			});
		return (
			<div className='comment-list'>
				{commentNodes}
			</div>
		);
    }
}
export default ImageComment;