'use strict';

import React                 from 'react';
import Header                from './Header';
import Tabs                  from './Tabs';
import List                  from './List';
import FilterBookable        from './FilterBookable';
import ShowFieldsButton      from './ShowFieldsButton';

export default React.createClass({
  displayName: 'Fields',

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
                <FilterBookable />
                <ShowFieldsButton />
              </div>
              <List />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

