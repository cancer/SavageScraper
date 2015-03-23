'use strict';

import React from 'react';

export default class List extends React.Component {
  render() {
    return (
      <table className="table table-striped">
        <colgroup>
          <col width="60" />
        </colgroup>
        <tr>
          <th>&nbsp;</th>
          <th>Name</th>
          <th>Address</th>
        </tr>
        <tr>
          <td>
            <span className="label label-success">予約可</span>
          </td>
          <td>
            <a href="">デザートユニオン</a>
          </td>
          <td>千葉県</td>
        </tr>
        <tr>
          <td>
            <span className="label label-danger">予約不可</span>
          </td>
          <td>
            <a href="">フォレストユニオン</a>
          </td>
          <td>千葉県</td>
        </tr>
        <tr>
          <td>
            <span className="label label-success">予約可</span>
          </td>
          <td>
            <a href="">Rock Hill</a>
          </td>
          <td>千葉県</td>
        </tr>
        <tr>
          <td>
            <span className="label label-danger">予約不可</span>
          </td>
          <td>
            <a href="">特区</a>
          </td>
          <td>茨城県</td>
        </tr>
        <tr>
          <td>
            <span className="label label-success">予約可</span>
          </td>
          <td>
            <a href="">トリガートーク</a>
          </td>
          <td>埼玉県</td>
        </tr>
        <tr>
          <td>
            <span className="label label-danger">予約不可</span>
          </td>
          <td>
            <a href="">九龍</a>
          </td>
          <td>神奈川県</td>
        </tr>
      </table>
    );
  }
}

