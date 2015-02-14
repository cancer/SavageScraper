'use strict';

var client = require('cheerio-httpcli');
var moment = require('moment');
var _ = require('lodash');

var weekEndIndexes = {
  0: [0, 6],
  7: [5, 6]
};

moment.locale('ja');

client.fetch('http://www.musa-web.net/union/index.cfm?ID=2', {
    normalizeWhitespace: true
  }, function(err, $, res){
  var sundayIndex = 0;
  var weekEndIndex = weekEndIndexes[sundayIndex];
  var dayOrNight = ['Day', 'Night'];
  var results = [];
  $('.dataTable').find('tr').each(function(idx){
    if(idx === 0) return; // 見出し行

    var $cols = $(this).find('td');
    results.push(weekEndIndex.reduce(function(memo, val){
      var cellIdx = val + 1;
      var dayOfMonth = ((idx - 1) * 7) + cellIdx;
      var date = moment().date(dayOfMonth);

      if(moment().isAfter(date)) return memo; // 過去の情報は含めない

      $cols.eq(val + 1).find('p > span').each(function(i){
        var bookable = !$(this).hasClass('forest') && !$(this).hasClass('reserved');
        memo.push({
          date: date.format('MM/DD dddd ') + dayOrNight[i],
          bookable: bookable
        });
      });
      return memo;
    }, []));
  });
  console.log(_.filter(_.flatten(results), 'bookable'));
});
