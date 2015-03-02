'use strict';

var lib = require('../_lib');
var calendar = require('../calendar');

module.exports = (request, response) => {
  request.params.year  = +request.params.year || lib.moment().get('year');
  request.params.month = +request.params.month || lib.moment().get('month');

  var url = 'http://www.cimax.jp/reservation.html';
  var options = {
    normalizeWhitespace: true
  };

  lib.client.fetch(url, options).then((result) => {
    var $ = result.$;

    var availableMonths = $('.cal_month').text().replace(/(\d{4,})年(\d+)月/g, '$1/$2').split(' ');
    var tableIndex = availableMonths.indexOf(request.params.year + '/' + request.params.month);
    var $table = $('.cal_base').eq(tableIndex);
    /*
     *     日  |   月  |   火  |   水  |   木  |   金  |   土  | // 曜日行(最初のみ)
     *   ----- | ----- | ----- | ----- | ----- | ----- | ----- |
     *     1   |   2   |   3   |   4   |   5   |   6   |   7   | // 日付行(1~2行ごと)
     *   ----- | ----- | ----- | ----- | ----- | ----- | ----- |
     *   A/B/C | A/B/C | A/B/C |       |       |       |       | // 予定行(1~2行こと)
     *   ----- | ----- | ----- | ----- | ----- | ----- | ----- |
     *         |       |       |       |       |       |  教室 | // 教室予定(不定期)
     *   ----- | ----- | ----- | ----- | ----- | ----- | ----- |
     *     8   |   9   |  10   |  11   |  12   |  13   |  14   | // 日付行(1~2行ごと)
     */
    // サバゲ教室の画像を含む行を消す
    $table.find('img[src="img/savakyo.gif"]').closest('tr').remove();
    var $rows = $table.find('tr');
    // 最初の曜日行を消す
    $rows.first().remove();
    // 奇数行の日付行を消す
    $rows.filter(':nth-child(odd)').remove();
    // 再度キャッシュ
    $rows = $table.find('tr');

    var results = calendar.getWeekEnds(request.params.year + '/' + request.params.month).reduce((result, val, idx) => {
      var date = val.date.format('MM/DD dd');
      var $col = $rows.eq(val.week).find('td').eq(val.day);
      result.push(parseColumn($col, $).map((obj) => {
        return lib._.extend({ date: date }, obj);
      }));
      return result;
    }, []);

    //response.send(results);
  }).catch((err) => {
    console.log(err);
    response.send({
      content: 'error'
    });
  });
};

function parseColumn($col, $){
  var detail = $col.text().replace(/[\n\r]/g,'');
  console.log(detail);
  return [];
}

function isBookable($target){
  var isFieldEvent = $target.hasClass('forest');
  var isReserved = $target.hasClass('reserved');
  return !isFieldEvent && !isReserved;
}


