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
    $tables.find('tr[bgcolor="#FEF2BA"]').remove();

    $tables.each((idx, table) => {
      var $table = $(table);
      var $rows = $table.find('tr');

      $rows.each((idx, row) => {
        var $row = $(row);
        var $cols = $row.find('td');
        $cols.each((idx, col) => {
          var $col = $(col);
          //日付の削除
          var $day = $col.find('b').remove();
          var day = $day.text().trim();
          var item = {};

          if (day) {
            item = {
              date: lib.moment([ request.params.year, request.params.month, day ]).format('MM/DD dddd'),
              summary: $col.text(),
              bookable: _isBookable($col.text())
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

  function _isBookable (detail) {
    var bookable = {
      mf: true,
      cf: true,
      bf: true,
      mid: {
        day: true,
        night: true
      }
    };
    if (/[MＭ][FＦ](貸切||平日交流会)/.test(detail) ) {
      bookable.mf = false;
    }
    if (/[CＣ][FＦ]貸切/.test(detail)) {
      bookable.cf = false;
    }
    if (/[TＴ][WＷ][FＦ].+貸切/.test(detail)) {
      bookable.mf = false;
      bookable.cf = false;
    }
    var midMatch = /[MＭ][IＩ][DＤ](.+)?貸切/.exec(detail)
    if (midMatch) {
      if (!midMatch[1]) {
        bookable.mid.day = false;
        bookable.mid.night = false;
      }
      if (midMatch[1] == '午前') {
        bookable.mid.day = false;
      }
      if (midMatch[1] == '午後') {
        bookable.mid.night = false;
      }
    }
    return bookable;
  };

};
