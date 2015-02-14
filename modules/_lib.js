'use strict';

var moment = require('moment');
moment.locale('ja');

module.exports = {
  _: require('lodash'),
  client: require('cheerio-httpcli'),
  moment: moment
};

