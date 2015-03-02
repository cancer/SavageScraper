'use strict';

var lib = require('../_lib');

module.exports = function(request, response){

  request.params.year  = +request.params.year || lib.moment().get('year');
  request.params.month = (+request.params.month)-1 || lib.moment().get('month');

  var url = 'http://www.no9-co.jp/cgi-bin/sche/sche37.cgi?cm=&year='+request.params.year+'&mon='+(request.params.month+1);
  var options = {
    normalizeWhitespace: true,
    decodeEntities: true
  };

  lib.client.fetch(url, options).then((result) => {

    var $ = result.$;
    var $tables = $('table[cellpadding="4"]');
    var result = {
      all: [],
      holiday: []
    };
    var idx_sunday = 0;
    var idx_saturday = 6;

    //曜日行を削除する
    $tables.find('tr:first-child').remove();

    $tables.each((idx, table) => {
      var $table = $(table);
      var $rows = $table.find('tr');

      $rows.each((idx, row) => {
        var $row = $(row);
        var $cols = $row.find('td');
        $cols.each((idx, col) => {
          var $col = $(col);
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
      mf: true,
      cf: true,
      bf: true,
      mid: true
    };
    return bookable;
  };

};
