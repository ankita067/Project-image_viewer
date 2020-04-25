import React, { Component } from 'react';
import CardMedia from '@material-ui/core/CardMedia';


class ImageMedia extends Component {
    constructor(props) {
        super(props);
        this.state = {


        }
    }

    render() {
        return (<div>
            <CardMedia title="">
                <img src={this.props.url} alt="User"></img>
            </CardMedia>
        </div>
        )
    }
}
export default ImageMedia;