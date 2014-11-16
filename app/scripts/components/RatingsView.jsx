/** @jsx React.DOM */

var React = require('react');
var _ = require('lodash');

var RatingsView = React.createClass({

  getInitialState: function() {
    return { ratings: []};
  },

  render: function() {

    var items = _.chain(this.props.players)
            .map(function(player) {
                return { name: player.name, rating: player.ratings.glicko2.getRating() };
            })
            .sortBy(function(item) {
                return -item.rating;
            })
            .map(function(item, index) {
                return <li key={index}>
                          {item.rating} - {item.name}
                       </li>
            })
            .value();

    return (
      <div className="ratings">
        {items}

        <button type="submit" onClick={this.props.rateGames}>Rate games</button>  
        
      </div>
  );}

  
});

module.exports = RatingsView;
