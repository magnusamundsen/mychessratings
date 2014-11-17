/** @jsx React.DOM */

var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var RegisterPlayer = React.createClass({

  getInitialState: function() {
      return { name: "", username: "" };
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
      "username": this.state.username,
      "name": this.state.name,
      "groups": {}
    };

    this.props.addPlayer(player);
    this.setState({ name: "", username: "" });  
  },

  render: function() {

    return (

      <form onSubmit={this.handleSubmit}>
      <fieldset>

        <div className="form-group">
          <div className="input-group input-group-lg">
            <input id="username" name="username" type="text" value={this.state.username} onChange={this.handleUsernameChange} placeholder="E-mail" className="form-control" required="" />          
            <input id="playername" name="playername" type="text" value={this.state.name} onChange={this.handleNameChange} placeholder="Player name" className="form-control" required="" />          
            <button type="submit" id="addplayer" name="addplayer" className="form-control btn btn-success">Add</button>
          </div>
        </div>

        </fieldset>
        </form>
  );}

  
});

module.exports = RegisterPlayer;
