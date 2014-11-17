/** @jsx React.DOM */

var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

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

    return (

      <form className="form-inline" onSubmit={this.handleSubmit}>
      <fieldset>

        <div className="form-group">
          <div className="input-group col-md-12">
            <div className="input-group-addon">White</div>
            <input id="white" name="white" value={this.state.white} onChange={this.handleWhiteChange} className="form-control" placeholder="White player name" type="text" required="" />
          </div>
        </div>

        <div className="form-group">
          <div className="input-group col-md-12">
            <div className="input-group-addon">Black</div>
            <input id="black" name="black" value={this.state.black} onChange={this.handleBlackChange} className="form-control" placeholder="Black player name" type="text" required="" />
          </div>
        </div>

        <div className="form-group">
          <div className="input-group col-md-12">
            <select id="result" name="result" ref="result" className="form-control selectpicker" onChange={this.handleResultChange}>
              <option key="white" value="1-0">White wins</option>
              <option key="draw" value="0.5">Draw</option>
              <option key="black" value="0-1">Black wins</option>
            </select>
          </div>
        </div>

        <br/>
        <div className="form-group">
          <div className="input-group col-md-12">
            <button id="addgame" name="addgame" type="submit" className="form-control btn btn-success">Add game</button>
          </div>
        </div>


      </fieldset>
    </form>
 
  );}

  
});

module.exports = RegisterGame;
