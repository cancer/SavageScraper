'use strict';

import React                 from 'react';
import Header                from './Header';
import Tabs                  from './Tabs';
import List                  from './List';
import FieldsToggleFilter    from './FieldsToggleFilter';
import FieldsStore           from '../stores/FieldsStore';

export default React.createClass({
  displayName: 'Fields',

  getInitialState() {
    return {
      fields:     FieldsStore.getAll(),
      isShownAll: FieldsStore.isShownAll()
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
      isShownAll: FieldsStore.isShownAll()
    });
    console.log(FieldsStore.isShownAll())
  },

  render() {
    let style = {
      panel: {
        margin: '10px'
      }
    };
    return (
      <div>
        <Header>SavageScraper</Header>
        <!--Tabs /-->
        <div className="row">
          <div className="col-md-10 col-md-push-1">
            <div className="panel panel-default">
              <div className="panel-heading">フィールド一覧</div>
              <div className="panel-body">
                <p>2015/3の予約状況</p>
                <FieldsToggleFilter isShownAll={this.state.isShownAll} />
              </div>
              <List fields={this.state.fields} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

