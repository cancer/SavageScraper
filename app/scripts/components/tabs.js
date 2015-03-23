'use strict';

import React from 'react';

export default class Tabs extends React.Component {
  render() {
    return (
      <ul className="nav nav-tabs nav-justified">
        <li role="presentation" className="active"><a href="">フィールド一覧</a></li>
        <li role="presentation"><a href="">検索</a></li>
      </ul>
    );
  }
}

