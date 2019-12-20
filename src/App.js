import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import * as firebase from 'firebase';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor() {
    super();
    this.state = {
      checkedIn: '',
      name: '',
      idNumber: '',
      query: ''
    };
  }

  componentWillUpdate(newProp, newState) {
    if (newState.query !== this.state.query) {
      const dbRef = firebase.database().ref('students');
      let valueRef = dbRef.child(newState.query);
      valueRef.on('value', snap => {
        this.setState({
          checkedIn: snap.child('checkedIn').val(),
          name: snap.child('name').val(),
          idNumber: snap.child('idNumber').val()
        })
      });
    }
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    if (document.getElementById('id').value !== null) {
      this.setState ({
        query: document.getElementById('id').value
      });
    }
  }

  render () {
    if (this.state.name === null) {
      return (
        <div className='App'>
          <h1>Enter Student ID</h1>
          <form onSubmit={this.handleOnSubmit}>
              <input type='text' id='id'/>
              <input type='submit' value='Submit'/>
          </form>
          <div>
            <p>No student found.</p>
          </div>
        </div>
      );
    } else if (this.state.query !== '' && this.state.name !== '') {
      return (
        <div className='App'>
          <h1>Enter Student ID</h1>
          <form onSubmit={this.handleOnSubmit}>
              <input type='text' id='id'/>
              <input type='submit' value='Submit'/>
          </form>
          <div>
            <p>Checked in {this.state.name}, ID: {this.state.idNumber}</p>
          </div>
        </div>
      );
    }

    return (
      <div className='App'>
        <h1>Enter Student ID</h1>
        <form onSubmit={this.handleOnSubmit}>
            <input type='text' id='id'/>
            <input type='submit' value='Submit'/>
        </form>
      </div>
    );
  }
}

export default App;
