'use strict';

var moment = require('moment');
require('moment-isocalendar');
moment.locale('ja');

module.exports = {
  _: require('lodash'),
  client: require('cheerio-httpcli'),
  moment: moment
};

