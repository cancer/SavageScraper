'use strict';

import React         from 'react';
import App           from './components/App';
import Fields        from './components/Fields';
import FieldNotFound from './components/FieldNotFound';
import FieldDetail   from './components/FieldDetail';
import {
  Route,
  DefaultRoute,
  NotFoundRoute
} from 'react-router';

export default (
  <Route path="/" handler={App}>
    <DefaultRoute handler={Fields} />
    <Route name="field-detail" path="/field/:field" handler={FieldDetail} />
    <NotFoundRoute handler={FieldNotFound} />
  </Route>
)

