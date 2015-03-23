'use strict';

import React from 'react';
import FieldsActionCreators from '../actions/FieldsActionCreators';

export default React.createClass({
  displayName: 'FieldsToggleFilter',

  propTypes: {
    isShownAll: React.PropTypes.boolean
  },

  handleFetchAll(e) {
    e.preventDefault();
    FieldsActionCreators.fetchAllFields();
  },

  handleFetchFiltered(e) {
    e.preventDefault();
    FieldsActionCreators.fetchByMonth('2015', '03');
  },

  render() {
    let button;

    console.log(this.props.isShownAll)

    if(this.props.isShownAll) {
      button = (
        <a href="" className="btn btn-success" onClick={this.handleFetchFiltered}>
          予約可能なフィールドだけ表示
        </a>
      );
    }
    else {
      button = (
        <a href="" className="btn btn-primary" onClick={this.handleFetchAll}>
          フィールド一覧を表示
        </a>
      );
    }

    return button;
  }
});

