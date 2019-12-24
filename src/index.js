import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './index.css';
import App from './App';
import Admin from './admin';
import LogIn from './login';
import * as serviceWorker from './serviceWorker';

class Index extends Component {
  render () {
      if (localStorage.getItem('user') === '42Xc00ANQzXYOK99xMvI5Zjfr8L2') {
        return (
          <Router>
            <Route exact path='/' component={App}/>
            <Route exact path='/admin' component={Admin}/>
            <Route exact path='/login' component={LogIn}/>
            <Redirect from='/login' to='/admin'/>
          </Router>
        );
      } else {
        return (
          <Router>
            <Route exact path='/' component={App}/>
            <Route exact path='/admin' component={Admin}/>
            <Route exact path='/login' component={LogIn}/>
            <Redirect from='/admin' to='/login'/>
          </Router>
        );
      }
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
