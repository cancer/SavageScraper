'use strict';

import React from 'react';

export default React.createClass({
  displayName: 'ShowBookable',

  render() {
    return(
      <div className="checkbox">
        <label>
          <input type="checkbox" />
          予約可能なフィールドだけ表示
        </label>
      </div>
    );
  }
});

