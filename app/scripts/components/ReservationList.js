'use strict';

import React       from 'react';

export default React.createClass({
  displayName: 'ReservationList',

  propTypes: {
    reservation: React.PropTypes.array
  },

  render() {
    let style = {
      label: {
        margin: '20px'
      }
    };
    let reserves = this.props.reservation.map((reserve, index) => {
      let isReserved = reserve.reserved !== "";
      return (
        <li className="list-group-item">
          { !isReserved &&
            <span className="label label-success">OK</span>
          }

          { isReserved &&
            <span className="label label-danger">NG</span>
          }

          <span style={style.label}>{reserve.date} {reserve.area}</span>
        </li>
      );
    });
    return (
      <ul className="list-group">
        {reserves}
      </ul>
    );
  }
});

