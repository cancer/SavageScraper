'use strict';

import React from 'react';

export default class Tabs extends React.Component {
  render() {
    return (
      <ul className="nav nav-tabs nav-justified">
        <li>フィールド一覧</li>
        <li>検索</li>
      </ul>
    );
  }
}

