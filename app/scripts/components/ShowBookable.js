'use strict';

import React from 'react';

export default class ShowBookable extends React.Component {
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
}

