'use strict';

import React          from 'react';
import {RouteHandler} from 'react-router';
import Header         from './Header';
import Tabs           from './Tabs';

export default React.createClass({
  displayName: 'App',

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
            <div className="row">
              <div className="col-md-10 col-md-push-1">
                <RouteHandler />
              </div>
            </div>
          </div>
          <script src="/scripts/browser.js"></script>
        </body>
      </html>
    );
  }
})

