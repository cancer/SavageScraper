'use strict';

import React                 from 'react';
import {Route, DefaultRoute} from 'react-router';
import App                   from './components/app';

export default (
  <Route path="/" handler={App}>
    <Route name="field" />
    <DefaultRoute handler={App} />
  </Route>
)

