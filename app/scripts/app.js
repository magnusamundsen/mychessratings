/** @jsx React.DOM */

var React = require('react');
var App = require('./components/App');

React.renderComponent(
	<App />,
    document.getElementById('content')
);
