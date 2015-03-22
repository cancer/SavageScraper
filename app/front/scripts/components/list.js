'use strict';

import React from 'react';

export default class List extends React.Component {
  render() {
    return (
      <table className="table">
        <tr>
          <th>Name</th>
          <th>Address</th>
        </tr>
        <tr>
          <td>デザートユニオン</td>
          <td>千葉県</td>
        </tr>
        <tr>
          <td>フォレストユニオン</td>
          <td>千葉県</td>
        </tr>
        <tr>
          <td>Rock Hill</td>
          <td>千葉県</td>
        </tr>
        <tr>
          <td>特区</td>
          <td>茨城県</td>
        </tr>
        <tr>
          <td>トリガートーク</td>
          <td>埼玉県</td>
        </tr>
        <tr>
          <td>九龍</td>
          <td>神奈川県</td>
        </tr>
      </table>
    );
  }
}

