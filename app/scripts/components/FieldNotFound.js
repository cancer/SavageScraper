'use strict';

import React          from 'react';
import {RouteHandler} from 'react-router';

export default React.createClass({
  displayName: 'Field',

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          フィールドが見つかりません
        </div>
        <div className="panel-body">
          フィールドが見つかりません
        </div>
      </div>
    );
  }
});

