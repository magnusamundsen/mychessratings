/** @jsx React.DOM */

var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var RegisterGame = React.createClass({

  getInitialState: function() {
      return { white: "",
               black: "",
               result: ""};
  },

  handleWhiteChange: function(event) {
    this.setState({white: event.target.value});
  },

  handleBlackChange: function(event) {
    this.setState({black: event.target.value});
  },

  handleResultChange: function(event) {
    this.setState({result: event.target.value});
  },

  handleSubmit: function(event) {
    event.preventDefault();

    var game = {
      "timestamp": new Date().valueOf(),
      "white": this.state.white,
      "black": this.state.black,
      "result": this.state.result
    };

    this.props.addGame(game); 

    this.setState( { white: "",
                     black: "",
                     result: "" });   
  },

  render: function() {

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="white">White</label>
          <input type="text" ref="white" value={this.state.white} onChange={this.handleWhiteChange} />

          <label htmlFor="black">Black</label>
          <input type="text" ref="black" value={this.state.black} onChange={this.handleBlackChange} />

          <label htmlFor="result">Result</label>
          <select ref="result" name="result" onChange={this.handleResultChange}>
            <option key="white" value="1-0">White wins</option>
            <option key="remis" value="0.5">Remis</option>
            <option key="black" value="0-1">Black wins</option>
          </select>
          <button type="submit">Add</button>
        </form>
      </div>
  );}

  
});

module.exports = RegisterGame;
