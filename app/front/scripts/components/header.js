'use strict';

var React = require('../../../vendor/react/react');

var Header = React.createClass({
  render() {
    return <div className="page-header">{this.props.children}</div>;
  }
});

module.exports = Header;

