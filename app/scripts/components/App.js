'use strict';

import React          from 'react';
import {RouteHandler, Link} from 'react-router';
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
            <div className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link to="app" className="navbar-brand">SavageScraper</Link>
                </div>
              </div>
            </div>
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

