'use strict';

var lib = require('../_lib');
var entities = new (require('html-entities').XmlEntities);
var cimax = {};

cimax.fetch = () => {
  var url = 'http://www.cimax.jp/reservation.html';
  var options = {
    normalizeWhitespace: true
  };

  return lib.client.fetch(url, options);
};

cimax.getRows = ($, args) => {
  var availableMonths = $('.cal_month').text().replace(/(\d{4})年(\d+)月/g, '$1/$2').split(' ');
  var tableIndex = availableMonths.indexOf(args.year + '/' + args.month);
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
  return $table.find('tr');
};

cimax.parse = function($, $col){
  //HTMLの整形
  var detail = $col.html()
    .replace(/[\n\r]/g,'')
    .replace(/<br>/g,'')
    .replace(/\<img src=\"img\/(.+?)\.gif\".*?\>/g, () => {
      switch (arguments[1]) {
        case 'icon_a' : return 'Aフィールド' ; break;
        case 'icon_b' : return '<,>Bフィールド' ; break;
        case 'icon_c' : return '<,>Cフィールド' ; break;
        default : return '定例会';
      }
    });

  return detail.split('<,>').reduce((res, field, idx) => {
    //定例会であればAB不可
    var SCHEDULED = '定例会';
    if(field.indexOf(SCHEDULED) !== -1) {
      ['A', 'B'].forEach((v) => {
        res.push({
          field: v,
          bookable: false,
          summary: SCHEDULED
        });
      });
      return res;
    }

    var _match = field.match(/([ABC])フィールド(.*)/);
    if(_match === null) return res;

    var fieldName = _match[1];
    var groupName = _match[2];

    //AフィールドのgroupNameがスペースの場合は、AB貸切
    if (fieldName === 'A' && groupName === ' ') {
      res.push({
        field: fieldName,
        bookable: false,
        summary: 'AB貸切'
      });
      return res;
    }

    res.push({
      field: fieldName,
      bookable: groupName === '',
      summary: groupName || '予約可'
    });
    return res;
  }, []);
};

module.exports = cimax;

