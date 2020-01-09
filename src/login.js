import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';

import Firebase, { provider } from './config';

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    }
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    Firebase
      .auth()
      .onAuthStateChanged(user => {
        if (user) {
          this.setState({
            user: user
          });
          localStorage.setItem('user', user.uid);
        } else {
          this.setState({
            user: null,
          });
          localStorage.removeItem('user');
        }
      });
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    Firebase.auth().signInWithPopup(provider);
  }

  render () {
    if (this.state.user !== null) {
      return (
        <Router>
          <Redirect from='/login' to='/admin'/>
        </Router>
      );
    }

    return (
      <div className='Form'>
        <h1>LogIn Page</h1>
        <form onSubmit={this.handleOnSubmit}>
          <input type='submit' value='Log-in using your Google Account'/>
        </form>
      </div>
    );
  }
}

export default LogIn;
