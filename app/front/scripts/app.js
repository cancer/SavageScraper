'use strict';

import React  from 'react';
import Header from './components/header';
import Tabs   from './components/tabs';
import List   from './components/list';

var mountNode = document.getElementById('app');

React.render(
  <div>
    <Header>SavageScraper</Header>
    <Tabs />
    <List />
  </div>
  , mountNode
);

