'use strict';

import React          from 'react';
import {RouteHandler} from 'react-router';
import Header         from './Header';
import Tabs           from './Tabs';
import List           from './List';
import ShowBookable   from './ShowBookable';

export default class App extends React.Component {
  render() {
    return (
      <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" />
        <title>SavageScraper</title>
      </head>
      <body>
        <div id="app">
          <Header>SavageScraper</Header>
          <!--Tabs /-->
          <div className="panel panel-default">
            <div className="panel-heading">フィールド一覧</div>
            <div className="panel-body">
              <p>2015/3の予約状況</p>
              <ShowBookable />
            </div>
            <List />
            <RouteHandler />
          </div>
        </div>
        <script src="/scripts/bundle.js"></script>
      </body>
      </html>
    );
  }
}

