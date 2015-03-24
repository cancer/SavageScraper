'use strict';

import _                         from 'lodash';
import React                     from 'react';
import FieldNotFound             from './FieldNotFound';
import SearchReservation         from './SearchReservation';
import ReservationList           from './ReservationList';
import FieldDetailStore          from '../stores/FieldDetailStore';
import FieldDetailActionCreators from '../actions/FieldDetailActionCreators';

export default React.createClass({
  displayName: 'FieldDetail',

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      field: FieldDetailStore.get()
    };
  },

  componentDidMount() {
    FieldDetailStore.addChangeListener(this.onChange);

    if(!this.isExistsField()) {
      let field = this.context.router.getCurrentParams().field
      FieldDetailActionCreators.fetchField(field)
    }
  },

  componentWillUnMount() {
    FieldDetailStore.removeChangeListener(this.onChange);
  },

  isExistsField() {
    return !!this.state.field;
  },

  onChange() {
    this.setState({
      field: FieldDetailStore.get()
    });
  },

  render() {
    return (
      <div>
        { this.isExistsField() &&
          <div className="panel panel-default">
            <div className="panel-heading">
              <a href={this.state.field.site} target="_blank">{this.state.field.name}</a>
            </div>
            <div className="panel-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Address</th>
                    <th>Fields</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <a href={`https://www.google.co.jp/maps/place/${this.state.field.location}`} target="_blank">
                        {this.state.field.location}
                      </a>
                    </td>
                    <td>
                      {this.state.field.area.map(val =>
                        <div>{val}</div>
                      )}</td>
                  </tr>
                </tbody>
              </table>
              <SearchReservation field={this.state.field.name_en} />
              <ReservationList reservation={this.state.field.reservation || []} />
            </div>
          </div>
        }

        { !this.isExistsField() && <FieldNotFound />}
      </div>
    );
  }
});

