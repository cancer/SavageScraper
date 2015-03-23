'use strict';

import React                 from 'react';
import Header                from './Header';
import Tabs                  from './Tabs';
import List                  from './List';
import InputMonth            from './InputMonth';
import FieldsStore           from '../stores/FieldsStore';

export default React.createClass({
  displayName: 'Fields',

  getInitialState() {
    return {
      fields:     FieldsStore.getAll(),
      month:      FieldsStore.getFilteredMonth()
    }
  },

  componentDidMount() {
    FieldsStore.addChangeListener(this.onChange);
  },

  componentWillUnMount() {
    FieldsStore.removeChangeListener(this.onChange);
  },

  onChange() {
    this.setState({
      fields:     FieldsStore.getAll(),
      month:      FieldsStore.getFilteredMonth()
    });
  },

  render() {
    let panelHead;
    if(this.state.month) {
      panelHead = <div className="panel-heading">{this.state.month} に予約可能なフィールド一覧</div>;
    }
    else {
      panelHead = <div className="panel-heading">フィールド一覧</div>;
    }

    return (
      <div>
        <Header>SavageScraper</Header>
        <!--Tabs /-->
        <div className="row">
          <div className="col-md-10 col-md-push-1">
            <div className="panel panel-default">
              {panelHead}
              <div className="panel-body">
                <InputMonth />
              </div>
              <List fields={this.state.fields} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

