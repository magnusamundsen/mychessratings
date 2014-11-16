var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var DefaultRoute = Router.DefaultRoute;

var App = require('./components/App');
var RegisterView = require('./components/RegisterView');
var RatingsView = require('./components/RatingsView');

var routes = (
  <Routes>
    <Route name="ratings" path="/" handler={App}>
       <DefaultRoute handler={RatingsView}/>
    </Route>
    <Route name="register" path="/register" handler={App}>
       <DefaultRoute handler={RegisterView}/>
    </Route>
  </Routes>
);

exports.start = function() {
  React.renderComponent(routes, document.getElementById('content'));
}
