'use strict';

import React        from 'react';
import Header       from './components/header';
import Tabs         from './components/tabs';
import List         from './components/list';
import ShowBookable from './components/show_bookable';

var mountNode = document.getElementById('app');

React.render(
  <div>
    <Header>SavageScraper</Header>
    <!--Tabs /-->
    <div className="panel panel-default">
      <div className="panel-heading">フィールド一覧</div>
      <div className="panel-body">
        <p>2015/3の予約状況</p>
        <ShowBookable />
      </div>
      <List />
    </div>
  </div>
  , mountNode
);

