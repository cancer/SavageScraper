'use strict';

import React from 'react';

export default React.createClass({
  displayName: 'Header',

  render() {
    return (
      <div className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a href="" className="navbar-brand">{this.props.children}</a>
          </div>
        </div>
      </div>
    );
  }
});

