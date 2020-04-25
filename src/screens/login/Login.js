import React, { Component } from 'react';
import './Login.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Header from '../../common/Header';


const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ textAlign: 'left', margin: 10 }}>
            {props.children}
        </Typography>
    );
}




class Login extends Component {

    constructor() {
        super();
        this.state = {
            usernameRequired: "dispNone",
            username: "",
            passwordRequired: "dispNone",
            password: "",
            loginFailed: "dispNone",
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true

        }
    }

    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value });
    }


    loginClickHandler = (e) => {

        ;

        let username = "test";
        let password = "test";


        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });


        if (this.state.username !== "" && this.state.password !== "") {
            this.state.username !== "test" || this.state.password !== "test" ? this.setState({ loginFailed: "dispBlock" }) : this.setState({ loginFailed: "dispNone" })


        } else {
            this.setState({ loginFailed: "dispNone" })

        }


        let that = this;


        if (this.state.username === username || this.state.passowrd === password) {

            let acess_token = "8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784";
            sessionStorage.setItem("access-token", acess_token);
            that.setState({
                loggedIn: true
            });


            this.props.history.push('/Home/');





        }


    }




    render() {
        return (
            <div>

                <Header {...this.state} />

                <div className="middle">
                    <Card>
                        <CardContent>

                            <TabContainer>
                                <div className="login-content">
                                    <Typography>LOGIN</Typography><br />
                                    <FormControl required className="login-width" >
                                        <InputLabel htmlFor="username"> Username </InputLabel>
                                        <Input id="username" type="text" username1={this.state.username} onChange={this.inputUsernameChangeHandler} />
                                        <FormHelperText className={this.state.usernameRequired}>
                                            <span className="red">required</span>
                                        </FormHelperText>
                                    </FormControl><br /><br />


                                    <FormControl required className="login-width">
                                        <InputLabel htmlFor="password"> Password </InputLabel>
                                        <Input id="password" type="password" password1={this.state.password} onChange={this.inputPasswordChangeHandler} />
                                        <FormHelperText className={this.state.passwordRequired}>
                                            <span className="red">required</span>
                                        </FormHelperText>
                                    </FormControl><br /><br /><br />

                                    <div className="login-container">

                                        <FormHelperText className={this.state.loginFailed}>
                                            <span className="LoginFialedMessage">
                                                <span className="red">Incorrect username and/or password</span>
                                            </span>
                                        </FormHelperText><br />

                                        <div>
                                            <FormControl>
                                                <Button variant="contained" color="primary" onClick={this.loginClickHandler}>Login</Button>
                                            </FormControl>
                                        </div>
                                    </div>

                                </div>
                            </TabContainer>

                        </CardContent>
                    </Card>

                </div>
            </div>
        )
    }
}



export default Login;