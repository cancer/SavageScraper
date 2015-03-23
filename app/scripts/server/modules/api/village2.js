'use strict';

var lib = require('../_lib');

module.exports = function(request, response){

  request.params.year  = +request.params.year || lib.moment().get('year');
  request.params.month = (+request.params.month)-1 || lib.moment().get('month');

  var year = request.params.year;
  var month = request.params.month;
  var url = 'http://www.village-one.org/v2Calendar.html';
  var options = {
    normalizeWhitespace: true,
    decodeEntities: true
  };

  lib.client.fetch(url, options).then((result) => {

    var $ = result.$;
    var $tables = $('.hpb-ca-tb1');
    var results = {
      all: [],
      holiday: []
    };
    var key_sunday = 'Sun';
    var key_saturday = 'Sat';
    var _prev_month;

    $tables.each((idx, table) => {
      var $table = $(table);
      var $trs = $table.find('tr');
      var title = $table.find('.hpb-subh02-cell1').text() || '';
      var parseTitle = title.match(/(\d+)年\s*(\d+)?月/);
      var _year  = (parseInt(parseTitle[1], 10));
      var _month = (parseInt(parseTitle[2], 10)-1) || _prev_month+1;
      _prev_month = _month;

      if (request.params.year === _year && request.params.month === _month) {
        //0番目のtrががタイトル行、1番目のtr見出し行なのでスルー
        for (var i=2, l=$trs.length; i<l; ++i) {
          var $tr = $trs.eq(i);
          var $tds = $tr.find('td');
          //0番目のtdが日付
          var parseDate = $tds.eq(0).text().trim().match(/\d+\/(\d+).*/);
          var day = parseInt(parseDate[1], 10);
          //1番目のtdが曜日
          var dayOfWeek = $tds.eq(1).text().trim();
          //2番目のtdが内容
          var detail = $tds.eq(2).text().trim();
          var item = {
            date: lib.moment([ _year, _month, day ]).format('MM/DD dddd'),
            summary: detail,
            bookable: _isBookable(detail)
          };
            results.all.push(item);
            if (dayOfWeek === key_sunday || dayOfWeek === key_saturday) {
              results.holiday.push(item)
            }
        }
      }

    });

    response.send(results);
  }).catch((err) => {
    response.send({
      content: 'error'
    });
  });

  function _isBookable (detail) {
    if (detail === '' || detail === '空き'){
      return true;
    } else {
      return false;
    }
  };

};
