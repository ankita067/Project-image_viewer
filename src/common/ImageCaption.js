import React, { Component } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './ImageCaption.css'


class ImageCaption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            captionId:"",
            captions:"",
            tag:[]
        }
    }
    UNSAFE_componentWillMount ()
    {
        this.setState({captions:this.props.caption});
        this.setState({tags:this.props.tags})
        this.setState({captionId:this.props.captionid})
      
    }

    render() {
        var tag = this.props.tags
			.map(function(tag){
				return (
					<span key={tag} className="hashtags">
                        
					#{tag}   
					</span>
                    
				);
			});
        
        return (<div>
            <CardContent>
                <Typography>
                    <span > 
                    {this.state.captions} <br/>
                    {tag}
                    </span>
                    </Typography>
                    
            </CardContent>
        </div>
        )
    }
}
export default ImageCaption;