import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #c0c0c0',
    backgroundColor: '#c0c0c0',
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
      
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        
      },
    },
  },
}))(MenuItem);

function CustomizedMenus(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderProfilePicture = () => {
    if (props.isLoggedIn === "undefined") {
      return "";
    } else {
      return <img src={props.userdata.profile_picture} className="ProfileIcon" alt={props.userdata.full_name} />

    }


  }
  const logoutHandler = (e) => {
    sessionStorage.removeItem("access-token");
    // this.setState({
    //     props.loggedIn: false
    // });
    // props.
    props.history.push('/');
    
}

const RedirectToProfilePage = (e) => {
  props.history.push('/Profile/');
  
}



  return (
<div>
    <IconButton  onClick={handleClick}>
      {renderProfilePicture()}
    </IconButton>
   
    <StyledMenu
   
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {props.IsProfile !== true &&
      <StyledMenuItem>
    
        <ListItemText  primary="My Account" onClick={RedirectToProfilePage} />
       
      </StyledMenuItem>
}
      <StyledMenuItem>
        <hr/>
        <ListItemText primary="Logout" onClick={logoutHandler} />
      </StyledMenuItem>
      
    </StyledMenu>
    </div >
  );
}

export default CustomizedMenus;