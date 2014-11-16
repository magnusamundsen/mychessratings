/** @jsx React.DOM */

var React = require('react');
var RegisterPlayer = require('./RegisterPlayer');
var RegisterGame = require('./RegisterGame');

var RegisterView = React.createClass({

  render: function() {

    return (
      <div>
        <RegisterGame addGame={this.props.addGame}/>
        <RegisterPlayer addPlayer={this.props.addPlayer}/>
      </div>
  );}

  
});

module.exports = RegisterView;
