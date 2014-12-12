/** @jsx React.DOM */

var React = require('react');
var _ = require('lodash');
var RatingsList = require('./RatingsList');
var RegisterPlayer = require('./RegisterPlayer');
var RegisterGame = require('./RegisterGame');
var GamesList= require('./GamesList');

var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var glicko2 = require ('glicko2');
var elo = require('elorating');

var ratingSettings = {
  // tau : "Reasonable choices are between 0.3 and 1.2, though the system should
  //       be tested to decide which value results in greatest predictive accuracy."
  tau : 0.5,
  // rating : default rating
  rating : 1500,
  //rd : Default rating deviation
  //     small number = good confidence on the rating accuracy
  rd : 200,
  //vol : Default volatility (expected fluctation on the player rating)
  vol : 0.06
};

var App = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function() {
    this.players = {};
    this.games = [];
    this.ranking = new glicko2.Glicko2(ratingSettings);
    
    return { players: {},
             games: [],
             ratingtype: "elo"
           };
  },

  componentWillMount: function() {
    this.firebasePlayersRef = new Firebase("https://YOUR FIREBASE URL HERE/mychessratings/players");
    this.firebasePlayersRef.on("child_added", function(snapshot) {
      var player = snapshot.val();

      if (player !== undefined) {
        player.gamecount = 0;
        player.ratings = {};
        player.ratings.glicko2 = this.ranking.makePlayer( ratingSettings.rating,
                                                        ratingSettings.rd,
                                                        ratingSettings.vol);

        player.ratings.elo = ratingSettings.rating;
        this.players[player.username] = player;
        this.setState({ players: this.players });  
      }

      
    }.bind(this));

    this.firebaseGamesRef = new Firebase("https://YOUR FIREBASE URL HERE/mychessratings/games");
    this.firebaseGamesRef.on("child_added", function(snapshot) {
      var game = snapshot.val();
      this.rateGame(game);
      this.games.push(game);
      this.setState({ games: this.games });
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.firebaseGamesRef.off();
    this.firebasePlayersRef.off();
  },

  isValidPlayer: function(player) {
    if (this.state.players[player.username] == undefined &&
        player.name.trim() !== "") {
      return true;
    } else {
      return false;
    }
  },

  isValidGame: function(game) {
    if (this.state.players[game.white] !== undefined &&
        this.state.players[game.black] !== undefined &&
        game.result !== undefined &&
        game.result.trim() !== "") {
      return true;
    } else {
      return false;
    }
  },

  addPlayer: function(player) {
    if (this.isValidPlayer(player)) {
      this.firebasePlayersRef.push(player);
      console.log("addPlayer", player, this.state.players);
    } else {
      console.log("addPlayer failed. Invalid player.", player);
    }
  },

  addGame: function(game) {
    if (this.isValidGame(game)) {
      this.firebaseGamesRef.push(game);
      console.log("addGame", game);
    } else {
      console.log("addGame failed. Invalid game.", game);
    }
    
  },

  sortGames: function() {
    return _.chain(this.state.games)
                      .sortBy(function(game) {
                         return game.timestamp;
                      })
                      .value();
  },

  translateResult: function(result) {
    switch (result) {
      case "1-0":
        return 1;
        break;
      case "0.5":
        return 0.5;
        break;
      case "0-1":
        return 0;
        break;
      default:
        console.log("Translate result failed. Could not translate", result);
    } 

  },

  isRated: function(game) {
    return (game.rated != undefined && game.rated == true)
  },

  countGame: function(player) {
    if (this.state.players[player].gamecount == undefined) {
      this.state.players[player].gamecount = 1;
    } else {
      this.state.players[player].gamecount++;
    }
  },

  rateGlicko2: function(game) {
    var matches = [];
    var result = this.translateResult(game.result);
    var white = this.state.players[game.white].ratings.glicko2;
    var black = this.state.players[game.black].ratings.glicko2;
    matches.push([white, black, result]);
    
    this.ranking.updateRatings(matches);
  },

  rateElo: function(game) {

    var ratingWhite = this.state.players[game.white].ratings.elo;
    var ratingBlack = this.state.players[game.black].ratings.elo;

    var expectedScore = elo.getExpectedScore(ratingWhite, ratingBlack);

    var whiteResult = 0.5;
    var blackResult = 0.5;

    if (game.result == "1-0") {
      whiteResult = 1;
      blackResult = 0;
    } else if (game.result == "0-1") {
      whiteResult = 0;
      blackResult = 1;
    }

    this.state.players[game.white].ratings.elo = elo.updateRating(ratingWhite, whiteResult, expectedScore.Ea);
    this.state.players[game.black].ratings.elo = elo.updateRating(ratingBlack, blackResult, expectedScore.Eb);
  },

  rateGame: function(game) {
    if (game !== undefined && !this.isRated(game)) {
      this.countGame(game.white);
      this.countGame(game.black);
      
      this.rateGlicko2(game);
      this.rateElo(game);

      game.rated = true;

      this.setState({players: this.state.players}); 
    }
    
  },

  render: function() {

    return (
      <div id="app">

        <div className="header">
          <h3 className="text-muted">Storebrand</h3>
        </div>

        <div>
            <div className="jumbotron">
              <div className="ratings-view">
                <RatingsList players={this.state.players} ratingtype={this.state.ratingtype}/>
              </div>
            </div>
        </div>

        <div className="row marketing">
          <div className="col-lg-6">
            <h4>Register game</h4>
            <RegisterGame addGame={this.addGame} players={this.state.players} />
          </div>

          <div className="col-lg-6">
            <h4>Register player</h4>
            <RegisterPlayer addPlayer={this.addPlayer}/>
          </div>
        </div>

        <div className="col-lg-5">
            <div id="games-view">
              <GamesList players={this.state.players} games={this.state.games}/>
            </div>
        </div>


      </div>
  );}

});

module.exports = App;
