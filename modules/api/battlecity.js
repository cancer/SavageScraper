'use strict';

var lib = require('../_lib');

module.exports = function(request, response){

  request.params.year  = +request.params.year || lib.moment().get('year');
  request.params.month = (+request.params.month)-1 || lib.moment().get('month');

  var url = 'http://www.battle-union.jp/calendar/calendar.html';
  var options = {
    normalizeWhitespace: true,
    decodeEntities: true
  };

  lib.client.fetch(url, options).then((result) => {

    var $ = result.$;
    var $table = $('[id="schedule_table"]');
    var result = {
      all: [],
      holiday: []
    };
    var idx_sunday = 0;
    var idx_saturday = 6;

    $table.each(function(idx, v){

      var $that = $(this);
      var title = $that.find('caption').text();
      var $row  = $that.find('tr');
      var parseTitle = title.match(/(\d+)年(\d+)月/);
      var year  = (+parseTitle[1]);
      var month = (+parseTitle[2])-1;

      if (request.params.year === year && request.params.month === month) {
        /*
          1   |  2   |  3   |  4   |  5   |  6   |  7   | tr.eq(1) // i+i
         ---- | ---- | ---- | ---- | ---- | ---- | ---- | 
         予約 |      |      |      |      |      |      | tr.eq(2) // i+i+1
         ---- | ---- | ---- | ---- | ---- | ---- | ---- |
          8   |  9   |  10  |  11  |  12  |  13  |  14  | tr.eq(3)
         ---- | ---- | ---- | ---- | ---- | ---- | ---- |
         予約 |      |      |      |      |      |      | tr.eq(4)
         */
        for (var i=0, l= $row.length/2; i<l; i++) {
          var $cols_day = $row.eq(i+i).find('td');//日付の行のtd
          var $cols_detail = $row.eq(i+i+1).find('td');//日付に対する内容の行のtd


          $cols_day.each(function(idx, v){
            var $col = $(this);
            var num = $col.text().trim();
            var detail = $cols_detail.eq(idx).text().trim();
            var item = {
              date: lib.moment([ year, month, num ]).format('MM/DD dddd'),
              summary: detail,
              bookable: _isBookable(detail)
            }
            if (num) {
              result.all.push(item);
              if (idx === idx_sunday || idx === idx_saturday) {
                result.holiday.push(item)
              }
            }
          });
        }
        return false;
      }

      function _isBookable (detail) {
        var bookable = {
          a: true,
          b: true
        };
        if (/[(|（][A|Ａ][)|）]/.test(detail)) {
          bookable.a = false;
        }
        if (/[(|（][B|Ｂ][)|）]/.test(detail)) {
          bookable.b = false;
        }
        if (/(^[(|（]全面[)|）])|(メンテナンス|休業)/.test(detail)) {
          bookable.a = false;
          bookable.b = false;
        }
        return bookable;
      }

    });

    response.send(result);
  }).catch((err) => {
    response.send({
      content: 'error'
    });
  });

};
