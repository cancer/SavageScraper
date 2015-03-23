'use strict';

import React                 from 'react';
import Header                from './Header';
import Tabs                  from './Tabs';
import List                  from './List';
import FilterBookable        from './FilterBookable';
import FieldsStore           from '../stores/FieldsStore';
import FieldsActionCreators  from '../actions/FieldsActionCreators.js'

export default class Fields extends React.Component {
  componentDidMount() {
    FieldsActionCreators.fetchAllFields();
    FieldsStore.addChangeListener(this.onChange);
  }

  componentWillUnMount() {
    FieldsStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({ fields: FieldsStore.getAll() });
  }

  render() {
    return (
      <div>
        <Header>SavageScraper</Header>
        <!--Tabs /-->
        <div className="panel panel-default">
          <div className="panel-heading">フィールド一覧</div>
          <div className="panel-body">
            <p>2015/3の予約状況</p>
            <FilterBookable />
          </div>
          <List />
        </div>
      </div>
    );
  }
}

