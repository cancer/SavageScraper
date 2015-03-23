'use strict';

import React       from 'react';

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

