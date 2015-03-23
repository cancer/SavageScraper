'use strict';

import React          from 'react';
import {RouteHandler} from 'react-router';

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
          <RouteHandler />
        </div>
        <script src="/scripts/bundle.js"></script>
      </body>
      </html>
    );
  }
}

