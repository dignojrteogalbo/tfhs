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
            user: user.uid
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

  LogOut = (event) => {
    event.preventDefault();
    Firebase.auth().signOut();
  }

  render () {
    return (
      <div className='Form'>
        <h1>Log-In Page</h1>
        <h1>Logged in as {this.state.user}</h1>
        <form onSubmit={this.handleOnSubmit}>
          <input type='submit' value='Log-in using your Google Account'/>
        </form>
        <form onSubmit={this.LogOut}>
          <input type='submit' value='Log Out'/>
        </form>
      </div>
    );
  }
}

export default LogIn;
