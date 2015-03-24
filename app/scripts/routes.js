'use strict';

import React       from 'react';
import App         from './components/App';
import Fields      from './components/Fields';
import Field       from './components/Field';
import FieldDetail from './components/FieldDetail'
import {
  Route,
  DefaultRoute
} from 'react-router';

export default (
  <Route path="/" handler={App}>
    <DefaultRoute handler={Fields} />
    <Route name="field" path="/field" handler={Field}>
      <Route name="field-detail" path="/field/:field/" handler={FieldDetail} />
    </Route>
  </Route>
)

