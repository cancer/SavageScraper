'use strict';

import React                from 'react/addons';
import moment               from 'moment';
import FieldsActionCreators from '../actions/FieldsActionCreators';

export default React.createClass({
  displayName: 'InputMonth',

  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return {
      inputMonth: moment().format('YYYY/MM')
    }
  },

  handleFetchAll(e) {
    e.preventDefault();
    FieldsActionCreators.fetchAllFields();
  },

  handleFetchFiltered(e) {
    e.preventDefault();

    let date = moment(this.state.inputMonth, 'YYYY-MM-DD');
    this.validateDate(date);

    let [year, month] = date.format('YYYY/MM').split('/');
    FieldsActionCreators.fetchByMonth(year, month);
  },

  validateDate(date) {
    if(date.isValid()) return;

    throw new Error('Invalid date.');
  },

  render() {
    return(
      <form className="input-group" onSubmit={this.handleFetchFiltered}>
        <input type="date" className="form-control" valueLink={this.linkState('inputMonth')} placeholder="Input year/month" />
        <span className="input-group-btn">
          <button className="btn btn-success" type="submit">予約可能なフィールドだけ表示する</button>
        </span>
        <span className="input-group-btn">
          <a href="" className="btn btn-default" onClick={this.handleFetchAll}>
            すべてのフィールドを表示
          </a>
        </span>
      </form>
    );
  }
});

