'use strict';

var React = require('../../vendor/react/react');
var Header = require('./components/header');
var Tabs = require('./components/tabs');
var List = require('./components/list');

React.render(
  <div>
    <Header>SavageScraper</Header>
    <Tabs />
    <List />
  </div>
  ,
  document.getElementById('app')
);

