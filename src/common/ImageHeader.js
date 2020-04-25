import React, { Component } from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';


class ImageHeader extends Component {
    
    UNSAFE_componentWillMount() {
        this.setState({ date: this.props.created_time });
        // console.log(this.props.created_time);
    }
    
    render() {
        const convertDate = (date1) => {
            var yyyy = date1.getFullYear().toString();
            var mm = (date1.getMonth()+1).toString();
            var dd  = date1.getDate().toString();
          
            var mmChars = mm.split('');
            var ddChars = dd.split('');

            var hh=date1.getHours();
            var minute=date1.getMinutes();
            var ss=date1.getMinutes();
          
            return  (ddChars[1]?dd:"0"+ddChars[0])+'/'+  (mmChars[1]?mm:"0"+mmChars[0])+ '/'   +yyyy + '  ' + hh + ':'+minute +':'+ss;
          }
    let t=(this.props.created_time );
    if(t<1000000000000)
          t=t*1000;
   
    let currentDate = new Date(t);    
       
    let createdDate =  (convertDate(currentDate));
        return (<div>
            <CardHeader avatar={
                <Avatar>
                    <img src={this.props.profile_picture} alt="User"></img>
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