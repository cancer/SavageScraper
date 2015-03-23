'use strict';

import React                from 'react';
import FieldsActionCreators from '../actions/FieldsActionCreators';

export default React.createClass({
  displayName: 'ShowFieldsButton',

  handleClick(e) {
    e.preventDefault();
    FieldsActionCreators.fetchAllFields();
  },

  render() {
    return (
      <a href="" className="btn btn-primary" onClick={this.handleClick}>
        フィールド一覧を表示
      </a>
    );
  }
});

