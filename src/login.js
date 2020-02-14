import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import './App.css';

import Firebase, { provider } from './config';

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    }
    this.authListener = this.authListener.bind(this);
    this.currentUser = Firebase.auth().currentUser;
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    Firebase
      .auth()
      .onAuthStateChanged(user => {
        if (user) {
          this.currentUser = user;
          this.setState({
            user: user
          });
        } else {
          this.currentUser = null;
          this.setState({
            user: null
          });
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
    if (this.currentUser != null) {
      return (
        <div className='Form'>
          <h1>Log-In Page</h1>
          <h1>Logged in as {this.currentUser.displayName}</h1>
          <form>
            <NavLink to='/admin'><input type='submit' value='Admin Page'/></NavLink>
          </form>
          <form onSubmit={this.LogOut}>
            <input type='submit' value='Log Out'/>
          </form>
        </div>
      );
    } else {
      return (
        <div className='Form'>
          <h1>Log-In Page</h1>
          <h1>Not Logged In.</h1>
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
}

export default LogIn;
