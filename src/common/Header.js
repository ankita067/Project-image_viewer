import React, { Component } from 'react';
import './Header.css';
import CustomizedMenus from './Menu'



class Header extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        // const serach = () => {
        //     return <div className="search">
        //         <span className="searchIcon"><SearchIcon /></span>
        //         <input type="text" className="input" placeholder="Search..." />
        //     </div>
          // }
        return (
            <div>
                <div className="logo-Header">
                    
                    <div className="logo">Image Viewer</div>

                    {this.props.isLoggedIn === true &&
                        <div className="AfterLogin">
                            
                            <div className="userImage">
                                <CustomizedMenus {...this.props} />
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Header;