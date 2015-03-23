'use strict';

import React       from 'react';
import FieldsStore from '../stores/FieldsStore';

export default React.createClass({
  displayName: 'List',

  getInitialState() {
    return {
      fields: FieldsStore.getAll()
    }
  },

  componentDidMount() {
    FieldsStore.addChangeListener(this.onChange);
  },

  componentWillUnMount() {
    FieldsStore.removeChangeListener(this.onChange);
  },

  onChange() {
    this.setState({ fields: FieldsStore.getAll() });
  },

  render() {
    let fields = this.state.fields.map((field, index) => {
      return (
        <tr>
          <td>
            <a href="">{field.name}</a>
          </td>
          <td>
            {field.location}
          </td>
        </tr>
      );
    });
    return (
      <table className="table table-striped">
        <colgroup>
          <col width="60" />
        </colgroup>
        <tr>
          <th>Name</th>
          <th>Address</th>
        </tr>
        {{fields}}
      </table>
    );
  }
});

