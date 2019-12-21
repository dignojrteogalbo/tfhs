import React, { Component } from 'react';
import './App.css';

import Firebase from './config';

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      idNumber: '',
      success: null
    };
  }

  componentDidUpdate(oldProp, oldState) {
    if (this.state.name !== '' && this.state.idNumber !== '') {
      const dbRef = Firebase.database().ref('students');
      dbRef
        .orderByChild('idNumber')
        .equalTo(this.state.idNumber)
        .once('value', snap => {
          if (!snap.exists()) {
            dbRef.push({
              checkedIn: new Date(),
              name: this.state.name,
              idNumber: this.state.idNumber
            });
            this.setState({
              success: 'Student added successfully.'
            });
          } else if (this.state.success !== 'Student added successfully.' && this.state.success !== false) {
            this.setState({
              success: 'ID Number exists.'
            });
          }
        });
    }
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    if (document.getElementById('name').value !== '' && document.getElementById('idNumber').value !== '') {
      this.setState({
        name: document.getElementById('name').value,
        idNumber: document.getElementById('idNumber').value,
        success: true
      });
    } else {
      this.setState({
        success: false
      });
    }
  }

  render () {
    if (this.state.success === false) {
      return (
        <div className='Form'>
          <h1>Admin Page</h1>
          <form onSubmit={this.handleOnSubmit}>
            <p>Student Name</p>
            <input type='text' id='name'/>
            <p>Student ID</p>
            <input type='number' id='idNumber'/>
            <input type='submit' value='Add Student'/>
          </form>
          <div className='Info'>
            <p>Missing field(s).</p>
          </div>
        </div>
      );
    } else if (this.state.success === 'ID Number exists.') {
      return (
        <div className='Form'>
          <h1>Admin Page</h1>
          <form onSubmit={this.handleOnSubmit}>
            <p>Student Name</p>
            <input type='text' id='name'/>
            <p>Student ID</p>
            <input type='number' id='idNumber'/>
            <input type='submit' value='Add Student'/>
          </form>
          <div className='Info'>
            <p>{this.state.success}</p>
          </div>
        </div>
      );
    } else if (this.state.success === 'Student added successfully.') {
      return (
        <div className='Form'>
          <h1>Admin Page</h1>
          <form onSubmit={this.handleOnSubmit}>
            <p>Student Name</p>
            <input type='text' id='name'/>
            <p>Student ID</p>
            <input type='number' id='idNumber'/>
            <input type='submit' value='Add Student'/>
          </form>
          <div className='Info'>
            <p>{this.state.success}</p>
          </div>
        </div>
      );
    }

    return (
      <div className='Form'>
        <h1>Admin Page</h1>
        <form onSubmit={this.handleOnSubmit}>
          <p>Student Name</p>
          <input type='text' id='name'/>
          <p>Student ID</p>
          <input type='number' id='idNumber'/>
          <input type='submit' value='Add Student'/>
        </form>
      </div>
    );
  }
}

export default Admin;
