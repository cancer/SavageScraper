'use strict';

var lib = require('../_lib');

module.exports = function(request, response){

  request.params.year  = +request.params.year || lib.moment().get('year');
  request.params.month = (+request.params.month)-1 || lib.moment().get('month');

  var year = request.params.year;
  var month = request.params.month;
  var formattedDate = lib.moment([ year, month-1 ]).format('YYYY-MM')
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
          var col_id = $col.attr('id');

        });
      });

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
      night: true
    };
    return bookable;
  };

};
