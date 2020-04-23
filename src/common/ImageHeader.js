import React, { Component } from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';


class ImageHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {

            date:""
        }
    }
    UNSAFE_componentWillMount() {
        this.setState({ date: this.props.created_time });
    }
    render() {
        
    console.log(this.props.created_time)
    let currentDate = Date(this.state.date);    
    console.log(currentDate);
       
    let createdDate =  currentDate;
        return (<div>
            <CardHeader avatar={
                <Avatar>
                    <img src={this.props.profile_picture}></img>
                </Avatar>
            }
                title={this.props.full_name}
                subheader= {createdDate} >
            </CardHeader>
        </div>
        )
    }
}
export default ImageHeader;