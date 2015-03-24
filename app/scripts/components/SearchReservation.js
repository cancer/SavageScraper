'use strict';

import React                     from 'react/addons';
import moment                    from 'moment';
import FieldDetailActionCreators from '../actions/FieldDetailActionCreators';

export default React.createClass({
  displayName: 'SearchReservation',

  mixins: [React.addons.LinkedStateMixin],

  propTypes: {
    field: React.PropTypes.string
  },

  getInitialState() {
    return {
      inputMonth: moment().format('YYYY/MM')
    }
  },

  handleFetchFiltered(e) {
    e.preventDefault();

    let date = moment(this.state.inputMonth, 'YYYY-MM-DD');
    this.validateDate(date);

    let [year, month] = date.format('YYYY/MM').split('/');
    FieldDetailActionCreators.fetchFieldByMonth(this.props.field, year, month);
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
          <button className="btn btn-success" type="submit">の予約状況を表示</button>
        </span>
      </form>
    );
  }
});

