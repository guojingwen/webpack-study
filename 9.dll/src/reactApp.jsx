import React, { Component } from 'react';
// import '../css/reactapp.scss';

export default class ReactApp extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Hello React',
    };
  }
  render() {
    return (
      <div className="react-app">
        <div>{this.state.message}</div>
      </div>
    );
  }
}
