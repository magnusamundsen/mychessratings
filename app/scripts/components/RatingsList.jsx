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
              var listGroupItemClass = "list-group-item";
              var badgeClass = "badge";

              if (player.gamecount == 0) {
                listGroupItemClass  = listGroupItemClass + " disabled";
                badgeClass = badgeClass + " badge-disabled";
              }

              if (index == 1) {
                listGroupItemClass = listGroupItemClass + " list-group-item-success";
              }

              return <li key={index} className={listGroupItemClass}>
                        <span className="list-position">{index}</span>
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
          <ul className="list-group rating-list-group">
            {ratings}
          </ul>        
        </div>);
    }
  }  
});

module.exports = RatingsList;
