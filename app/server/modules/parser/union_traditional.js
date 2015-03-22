'use strict';

var lib = require('../_lib');
var calendar = require('../calendar');

module.exports = (id, opts) => {
  var options = {
    normalizeWhitespace: true,
    ID: id
  };
  opts.params = opts.params || {};
  opts.params.year = opts.params.year || lib.moment().get('year');
  opts.params.month = opts.params.month || lib.moment().get('month');

  var deferred = Promise.defer();
  var dateSpan = lib.moment([opts.params.year, opts.params.month - 1]).format('YYYY-MM');
  var url = 'http://www.musa-web.net/union/index.cfm';
  lib.client.fetch(url, options)
    .then((result) => {
      return result.$('form[name=form01]').submit({
        p_mode: 'GONEXT',
        p_date_span: dateSpan,
        p_doctor_id: id
      });
    })
    .then((result) => {
      var $ = result.$;
      var $rows = $('.dataTable').find('tr');
      var field = $rows.eq(1).find('td.hour > p').text().trim().split("\r\n").map(lib._.trim);

      var results = calendar.getWeekEnds(dateSpan).reduce((result, val, idx) => {
        var date = val.date.format('MM/DD dd');
        // 0行目は見出し行なのでずらす
        // 0列目は見出し行なのでずらす
        var $col = $rows.eq(val.week + 1).find('td').eq(val.day + 1);
        result.push(parseColumn($col, field, $).map((obj) => {
          return lib._.extend({ date: date }, obj);
        }));
        return result;
      }, []);

      deferred.resolve(lib._.flatten(results));
    })
    .catch((err) => {
      console.log(err);
      deferred.reject({
        error: err.msg,
        content: '非公開'
      })
    });

  return deferred.promise;
};

function parseColumn($col, field, $){
  var res = [];
  $col.find('p > span').each((i) => {
    var $this = $(this);
    res.push({
      field: field[i],
      bookable: isBookable($this),
      summary: $this.text().trim()
    });
  });
  return res;
}

function isBookable($target){
  var isFieldEvent = $target.hasClass('forest');
  var isReserved = $target.hasClass('reserved');
  return !isFieldEvent && !isReserved;
}

