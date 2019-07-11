import React, { Component } from "react";
import './App.css';
import Home from "../Home/Home";

export default class App extends Component {

  constructor(props) {
    super(props);
     this.props = props;     
  }

  componentWillMount() {
    this.props.store.subscribe(this.forceUpdate.bind(this));
  }

  render() {
    return (
      <Home {...this.props} store={this.props.store} /> 
    )
  };
}