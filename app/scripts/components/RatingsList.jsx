/** @jsx React.DOM */

var React = require('react');
var _ = require('lodash');

var RatingsList = React.createClass({

  render: function() {

    var ratingtype = this.props.ratingtype;

    var ratings = _.chain(this.props.players)
            .map(function(player) {
              if (ratingtype == "glicko2") {
                return { name: player.name, rating: player.ratings.glicko2.getRating(), gamecount: player.gamecount };
              } else if (ratingtype == "elo") {
                return { name: player.name, rating: Math.round(player.ratings.elo), gamecount: player.gamecount };
              }
            })
            .sortBy(function(player) {
                return -player.rating;
            })
            .map(function(player, index) {
              var index = index + 1;
              
              return <li key={index} className="list-group-item">
                        <span className="rating-position">{index}</span>
                        <span className="badge rating">{player.rating}</span> 
                        <span className="rating-player-name">{player.name}</span>
                        <span className="badge number-of-games">{player.gamecount}</span>
                      </li>
            })
            .value();

    if (ratings.length === 0) {
      return (<h2>Calculating..</h2>);
    } else {
      return (
        <div id="ratinglist">
          <ul className="list-group">
            {ratings}
          </ul>        
        </div>);
    }
  }  
});

module.exports = RatingsList;
