/** @jsx React.DOM */

var React = require('react');
var _ = require('lodash');

var GamesList = React.createClass({

  render: function() {

    var games = this.props.games;
    var players = this.props.players;

    var gameslist = _.chain(this.props.games)
            .sortBy(function(game) {
                return -game.timestamp;
            })
            .map(function(game, index) {

              var whitePlayer = players[game.white].name;
              var blackPlayer = players[game.black].name;
              var result = game.result;
              var date = new Date(game.timestamp);
              var dateYear = date.getFullYear();
              var dateMonth = date.getMonth() + 1;
              var dateMonthFormatted = dateMonth < 10 ? "0" + dateMonth : dateMonth;
              var dateDay = date.getDate();
              var formattedDate = dateDay + "/" + dateMonthFormatted + "/" + dateYear;
              
              var whiteClass, blackClass;

              if (game.result == "1-0") {
                whiteClass = "winner";
                blackClass = "loser";
              } else if (game.result == "0-1") {
                whiteClass = "loser";
                blackClass = "winner";
              } else {
                whiteClass = "draw";
                blackClass = "draw";
              }
             
              var index = index + 1;
              
              return <li key={index} className="list-group-item">
                        <span className="timestamp">{formattedDate}</span>
                        <span className={whiteClass}>{whitePlayer}</span> - <span className={blackClass}>{blackPlayer}</span>
                      </li>
            })
            .value();

    
    return (
      <div id="gameslist">
        <ul className="list-group">
          {gameslist}
        </ul>        
      </div>);
  }  
});

module.exports = GamesList;
