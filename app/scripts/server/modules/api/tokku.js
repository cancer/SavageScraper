'use strict';

var lib = require('../_lib');

module.exports = function(request, response){

  request.params.year  = +request.params.year || lib.moment().get('year');
  request.params.month = (+request.params.month)-1 || lib.moment().get('month');

  var year = request.params.year;
  var month = request.params.month;
  var formattedDate = lib.moment([ year, month ]).format('YYYY-MM');
  var url = 'http://www.tokku-switch.jp/wp/%E4%BA%88%E7%B4%84%E3%83%BB%E4%BA%88%E7%B4%84%E7%8A%B6%E6%B3%81?cid=all&yr='+request.params.year+'&format=calendar&time=month&dy=1&month='+(request.params.month+1);
  var options = {
    normalizeWhitespace: true,
    decodeEntities: true
  };

  lib.client.fetch(url, options).then((result) => {

    var $ = result.$;
    var $tables = $('.my-calendar-table');
    var result = {
      all: [],
      holiday: []
    };
    var idx_sunday = 0;
    var idx_saturday = 6;

    //曜日行を削除する
    $tables.find('thead').remove();

    $tables.each((idx, table) => {
      var $table = $(table);
      var $rows = $table.find('tr');

      $rows.each((idx, row) => {
        var $row = $(row);
        var $cols = $row.find('td');
        $cols.each((idx, col) => {
          var $col = $(col);
          var day, summary, item;
          //前月、次月のセルは無視する
          if (!$col.hasClass('nextmonth')) {
            day = +$col.find('.mc-date').text().trim();
            item = {
              date: lib.moment([ year, month, day ]).format('MM/DD dddd'),
              summary: $col.find('.event-title.summary').text(),
              bookable: _isBookable($col)
            };
            result.all.push(item);
            if (idx === idx_sunday || idx === idx_saturday) {
              result.holiday.push(item)
            }
          }
        });
      });

    });

    response.send(result);
  }).catch((err) => {
    response.send({
      content: 'error'
    });
  });

  function _isBookable ($col) {
    var bookable = {
      day: true,
      night: true
    };
    //昼貸切、休日定例会
    if (
      ($col.find('img[src$="/star.png"][style$="#ffffff;"]').length > 0)
      || ($col.find('img[src$="/games.png"][style$="#;"]').length > 0)
    ) {
      bookable.day = false;
    }
    //夜貸切、ナイター定例
    if (
      ($col.find('img[src$="/star.gif"][style$="#000000;"]').length > 0)
      || ($col.find('img[src$="/games.png"][style$="#000000;"]').length > 0)
    ) {
      bookable.night = false;
    }
    //定休日、フィールドメンテナンス、撮影
    if (
      ($col.find('img[src$="/appointment.png"]').length > 0)
      || ($col.find('img[src$="/shop.png"]').length > 0)
      || ($col.find('img[src$="/movies.png"]').length > 0)
    ) {
      bookable.day = false;
      bookable.night = false;
    }
    return bookable;
  };

};
