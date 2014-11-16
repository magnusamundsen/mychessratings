/** @jsx React.DOM */

var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var RegisterPlayer = React.createClass({

  getInitialState: function() {
      return { name: "" };
  },

  handleUsernameChange: function(event) {
    this.setState({username: event.target.value});
  },

  handleNameChange: function(event) {
    this.setState({name: event.target.value});
  },

  handleSubmit: function(event) {
    event.preventDefault();

    var player = {
      "name": this.state.name,
      "groups": {}
    };

    this.props.addPlayer(player);
    this.setState({ name: "" });  
  },

  render: function() {

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="name" value={this.state.name} onChange={this.handleNameChange} />
          <button type="submit">Add</button>
        </form>
      </div>
  );}

  
});

module.exports = RegisterPlayer;
