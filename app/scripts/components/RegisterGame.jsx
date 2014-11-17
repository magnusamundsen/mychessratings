/** @jsx React.DOM */

var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var _ = require('lodash');

var RegisterGame = React.createClass({

  getInitialState: function() {
      return { white: "",
               black: "",
               result: "1-0"};
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
                     black: ""
                   });   
  },

  render: function() {

    var players = _.chain(this.props.players)
            .sortBy(function(player) {
                return player.name;
            })
            .map(function(player, index) {
              return <option key={index} value={player.username}>{player.name}</option>
            })
            .value();

    return (
      <form onSubmit={this.handleSubmit}>
      <fieldset>

        <div className="form-group">

          <div className="input-group input-group-lg">
            <div className="input-group-addon">White</div>
            <select id="white" name="white" ref="white" className="form-control selectpicker" onChange={this.handleWhiteChange}>
              <option value=""></option>
              {players}
            </select>
          </div>

          <div className="input-group input-group-lg">
            <div className="input-group-addon">Black</div>
            <select id="black" name="black" ref="black" className="form-control selectpicker" onChange={this.handleBlackChange}>
              <option value=""></option>
              {players}
            </select>
          </div>

          <div className="input-group input-group-lg">
            <div className="input-group-addon">Result</div>
            <select id="result" name="result" ref="result" className="form-control selectpicker" onChange={this.handleResultChange}>
              <option key="white" value="1-0">White wins</option>
              <option key="draw" value="0.5">Draw</option>
              <option key="black" value="0-1">Black wins</option>
            </select>
          </div>
          
          <div className="input-group-lg">
            <button id="addgame" name="addgame" type="submit" className="form-control btn btn-success">Add game</button>
          </div>
        </div>

      </fieldset>
    </form>
 
  );}

  
});

module.exports = RegisterGame;
