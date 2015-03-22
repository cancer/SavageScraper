'use strict';

import React from 'react';

export default class Header extends React.Component {
  render() {
    return <div className="page-header">{this.props.children}</div>;
  }
}

