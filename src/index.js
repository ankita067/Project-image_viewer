import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
//import Login from './screens/login/Login';
//import Home from './screens/home/Home';
import 'typeface-roboto';
import Controller from './screens/Controller';

ReactDOM.render(
//   <BrowserRouter>
//   <Route path="/Login" component={ Login }/>
// </BrowserRouter>,
  <Controller/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
