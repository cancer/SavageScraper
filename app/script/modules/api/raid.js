'use strict';

var lib = require('../_lib');

module.exports = function(request, response){

  request.params.year  = +request.params.year || lib.moment().get('year');
  request.params.month = (+request.params.month)-1 || lib.moment().get('month');

  var url = 'http://survival-raid.com/reservation/top.cgi';
  var options = {
    normalizeWhitespace: true,
    decodeEntities: true
  };

  lib.client.fetch(url, options).then((result) => {

    var $ = result.$;
    var $tables = $('.calendar');
    var result = {
      all: [],
      holiday: []
    };
    var idx_sunday = 0;
    var idx_saturday = 6;

    //曜日行を削除する
    $tables.find('tr:first-child').remove();

    $tables.each((idx, table) => {
      var $calendar = $(table);
      var $table = $calendar.find('.calendarborder');
      var $rows = $table.find('tr');
      var title = $calendar.find('caption').text().trim();//2015年 3月
      var parseTitle = title.match(/(\d+)年\s?(\d+)月/);
      var year  = (+parseTitle[1]);
      var month = (+parseTitle[2])-1;

      if (request.params.year === year && request.params.month === month) {

        $rows.each((idx, row) => {
          var $row = $(row);
          var $cols = $row.find('td');
          $cols.each((idx, col) => {
            var $col = $(col);
            var day = +$col.find('b').text().trim();
            $col.find('b').remove();
            $col.find('.holname').remove();
            var item = {
              date: lib.moment([ year, month, day ]).format('MM/DD dddd'),
              summary: $col.text(),
              bookable: _isBookable($col.text())
            };
            if (day) {
              result.all.push(item);
              if (idx === idx_sunday || idx === idx_saturday) {
                result.holiday.push(item)
              }
            }
          });
        });

      }
    });

    response.send(result);
  }).catch((err) => {
    response.send({
      content: 'error'
    });
  });

  function _isBookable (detail) {
    var bookable = {
      day: true,
      night:true
    };
    if (/貸切受付NG/.test(detail)) {
      bookable.day = false;
      bookable.night = false;
    }
    if (/BBQ定例会/.test(detail)) {
      bookable.day = false;
      bookable.night = false;
    }
    if (/貸切昼/.test(detail)) {
      bookable.day = false;
    }
    if (/貸切夜/.test(detail)) {
      bookable.night = false;
    }
    return bookable;
  };

};
