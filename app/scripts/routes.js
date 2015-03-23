'use strict';

import React    from 'react';
import App      from './components/App';
import Fields   from './components/Fields';
import {
  Route,
  DefaultRoute
} from 'react-router';

export default (
  <Route path="/" handler={App}>
    <Route handler={Fields} />
    <DefaultRoute handler={Fields} />
  </Route>
)

