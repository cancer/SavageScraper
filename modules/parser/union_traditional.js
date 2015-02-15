'use strict';

var lib = require('../_lib');

module.exports = function(id, opts){
  var options = {
    normalizeWhitespace: true,
    ID: id
  };
  var deferred = Promise.defer();
  var dateSpan = null;
  opts.params = opts.params || {};
  if(opts.params.month === undefined){
    opts.params.year = opts.params.year || lib.moment().get('year');
    opts.params.month = lib.moment().get('month');
  }
  dateSpan = lib.moment([opts.params.year, opts.params.month - 1]).format('YYYY-MM');

  lib.client.fetch('http://www.musa-web.net/union/index.cfm', options)
    .then((result) => {
      return result.$('form[name=form01]').submit({
        p_mode: 'GONEXT',
        p_date_span: dateSpan,
        p_doctor_id: id
      });
    })
    .then((result) => {
      var $ = result.$;
      var weekEndIndex = [0, 6];
      var dayOrNight = ['Day', 'Night'];
      var results = [];
      $('.dataTable').find('tr').each(function(idx){
        if(idx === 0) return; // 見出し行

        var $cols = $(this).find('td');
        results.push(weekEndIndex.reduce(function(memo, val){
          var cellIdx = val + 1;
          var dayOfMonth = ((idx - 1) * 7) + cellIdx;
          var date = lib.moment(dateSpan).date(dayOfMonth);

          var cols = [];
          $cols.eq(val + 1).find('p > span').each(function(i){
            var bookable = !$(this).hasClass('forest') && !$(this).hasClass('reserved');
            cols.push({
              date: date.format('MM/DD dddd '),
              period: dayOrNight[i],
              bookable: bookable,
              summary: $(this).text().trim()
            });
          });
          memo.push(cols);
          return memo;
        }, []));
      });

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

