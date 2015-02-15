'use strict';

var lib = require('../_lib');

module.exports = function(id, opts){
  var options = {
    normalizeWhitespace: true
  };
  var deferred = Promise.defer();

  opts.params = opts.params || {};
  opts.params.year = opts.params.year || lib.moment().get('year');
  opts.params.month = opts.params.month || lib.moment().get('month');

  lib.client.fetch('https://asobiba-reserve.herokuapp.com/shops/'+id+'?month='+opts.params.month+'&year='+opts.params.year, options)
    .then((result) => {
      var $ = result.$;
      var results = {
        all: [],
        holiday: []
      };
      
      var $weeks = $('.calendarWeek');
      $weeks.each((idx_week, week) => {
        var $week = $(week);
        var $days = $week.find('.calendarWrap');
        $days.each((idx_day, day) => {
          var $day = $(day);
          var item = {};
          if ($day.hasClass('disable') === false && $day.hasClass('ampmlabel') === false) {
            var day_num = parseInt($day.find('.calendarDay')[0].childNodes[0].nodeValue, 10);
            var date = lib.moment([opts.params.year, opts.params.month-1, day_num]);
            lib._.each([$day.find('.calendarAm'), $day.find('.calendarPm')], ($ap, idx_ampm) => {
              var summary = $ap.text().trim();
              var item = {
                date: date.format('MM/DD dddd'),
                period: idx_ampm === 0 ? 'Day' : 'Night',
                bookable: /貸切予約可/.test(summary),
                summary: summary
              };
              if (idx_day === 6 || idx_day === 7 ) {
                results.holiday.push(item);
              }
              results.all.push(item);
            });
          }
        });
      });

      deferred.resolve(results);
    })
    .catch((err) => {
      deferred.reject({
        error: err.msg,
        content: '非公開'
      })
    });

  return deferred.promise;
};
