'use strict';

import React       from 'react';
import {Link}      from 'react-router';

export default React.createClass({
  displayName: 'List',

  propTypes: {
    fields: React.PropTypes.array
  },

  render() {
    let fields = this.props.fields.map((field, index) => {
      return (
        <tr>
          <td>
            <Link to="field-detail" params={{field: field.name_en}}>{field.name}</Link>
          </td>
          <td>
            {field.location}
          </td>
        </tr>
      );
    });
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {fields}
        </tbody>
      </table>
    );
  }
});

