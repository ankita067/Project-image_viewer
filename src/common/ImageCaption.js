import React, { Component } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


class ImageCaption extends Component {
    constructor(props) {
        super(props);
        this.state = {


        }
    }

    render() {
        return (<div>
            <CardContent>
                <Typography>{this.props.caption}</Typography>
            </CardContent>
        </div>
        )
    }
}
export default ImageCaption;