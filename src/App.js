import React, { Component } from 'react';
import './App.css';

import Firebase from './config';

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

  componentDidUpdate(oldProp, oldState) {
    if (oldState.query !== this.state.query && this.state.query !== '' && this.state.query !== null) {
      const dbRef = Firebase.database().ref('students');
      dbRef
        .orderByChild('idNumber')
        .equalTo(this.state.query)
        .once('value', snap => {
          if (snap.exists()) {
            snap.forEach(child => {
              child.ref.update({
                checkedIn: new Date()
              });
              this.setState({
                checkedIn: child.child('checkedIn').val(),
                name: child.child('name').val(),
                idNumber: child.child('idNumber').val(),
              });
            })
          } else {
            this.setState({
              checkedIn: '',
              name: null,
              idNumber: null
            })
          }
        });
    }
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    this.setState ({
      query: document.getElementById('id').value
    });
  }

  render () {
    if (this.state.name === null || this.state.idNumber === null) {
      return (
        <div className='Form'>
          <h1>Enter Student ID</h1>
          <form onSubmit={this.handleOnSubmit}>
              <input type='number' id='id'/>
          </form>
          <div className='Info'>
            <p>No student found.</p>
          </div>
        </div>
      );
    } else if (this.state.name !== '' && this.state.checkedIn !== '') {
      return (
        <div className='Form'>
          <h1>Enter Student ID</h1>
          <form onSubmit={this.handleOnSubmit}>
              <input type='number' id='id'/>
          </form>
          <div className='Info'>
            <p>Checked in {this.state.name}, ID: {this.state.idNumber}. At {Date(this.state.checkedIn).toLocaleString()}</p>
          </div>
        </div>
      );
    }
    return (
      <div className='Form'>
        <h1>Enter Student ID</h1>
        <form onSubmit={this.handleOnSubmit}>
            <input type='number' id='id'/>
        </form>
      </div>
    );
  }
}

export default App;
