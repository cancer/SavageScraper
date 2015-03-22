'use strict';

var lib = require('../_lib');
var calendar = require('../calendar');
var cimax = require('../parser/cimax');

module.exports = (request, response) => {
  request.params.year  = +request.params.year || lib.moment().get('year');
  request.params.month = +request.params.month || lib.moment().get('month') + 1;

  cimax.fetch()
    .then((result) => {
      var $ = result.$;
      var $rows = cimax.getRows($, request.params);

      var days = calendar.getWeekEnds(request.params.year + '/' + request.params.month);
      var results = days.reduce((result, val, idx) => {
        var date = val.date.format('MM/DD dd');
        var $col = $rows.eq(val.week).find('td').eq(val.day);
        result.push(cimax.parse($, $col).map((obj) => {
          return lib._.extend({ date: date }, obj);
        }));
        return result;
      }, []);

      response.send(results);
    })
    .catch((err) => {
      console.log(err);
      response.send({
        content: 'error',
        error: {
          message: err.message
        }
      });
    });
};

