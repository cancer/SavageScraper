'use strict';

var lib = require('../_lib');

module.exports = function(request, response){

  request.params.year  = +request.params.year || lib.moment().get('year');
  request.params.month = (+request.params.month)-1 || lib.moment().get('month');

  var url = 'http://www.cimax.jp/reservation.html';
  var options = {
    normalizeWhitespace: true,
    decodeEntities: true
  };

  lib.client.fetch(url, options).then((result) => {

    var $ = result.$;
    var $table = $('.cal_base');
    var $month_headers = $('.cal_month');
    var results = {
      all: [],
      holiday: []
    };
    var idx_sunday = 0;
    var idx_saturday = 6;

    //サバゲ教室のtrを削除する
    $table.find('img[src="img/savakyo.gif"]').closest('tr').remove();
    //曜日のtrを削除する
    $table.find('tr:first-child').remove();

    $table.each((idx, v) => {
      var $that = $(this);
      var $month_header = $month_headers.eq(idx);
      var parseTitle = $month_header.text().trim().match(/(\d+)年(\d+)月/);
      var year  = (+parseTitle[1]);
      var month = (+parseTitle[2])-1;
      var $weeks = $that.find('tr');

      if (request.params.year === year && request.params.month === month) {

        //その月の週の数だけループさせる
        for (var i=0, l=($weeks.length-1)/2; i<l; i++) {
          //日付
          var $week = $($weeks[(i+i)]);
          var $week_cols = $week.find('td');
          //日付に対する内容（日付の行+1が予定の行）
          var $detail_row = $($weeks[(i+i)+1]);
          var $detail_col = $detail_row.find('td');
          //それぞれの日を調べていく
          $week_cols.each((cols_idx, v) => {
            var day = $(this).text().trim();
            var date = lib.moment([year, month, +day]);
            var detail = $detail_col.eq(cols_idx).html();
            var item = _parseDetail(year, month, day, detail);
            if (item) {
              if (date.weekday() === idx_sunday || date.weekday() === idx_saturday) {
                results.holiday.push(item);
              }
              results.all.push(item);
            }
          });
        }

      }
    });

    response.send(results);
  }).catch((err) => {
    response.send({
      content: 'error'
    });
  });

  //内容のパースをして、API用のオブジェクトを作って返す
  function _parseDetail(year, month, day, detail) {
    if (!day) {
      return false;
    }
    var item = {
      date: lib.moment([year, month, +day]).format('MM/DD dddd'),
      summary: '',
      bookable: {
        a: false,
        b: false,
        c: false
      }
    };
    //文字列の整形
    var detail_without_img = detail
      .replace(/[\n\r]/g,'')
      .replace(/<br>/g,'')
      .replace(/\<img src=\"img\/(.+?)\.gif\".*?\>/g, (m) => {
        switch (true) {
          case arguments[1] === 'icon_a' : return 'Aフィールド' ; break;
          case arguments[1] === 'icon_b' : return '<,>Bフィールド' ; break;
          case arguments[1] === 'icon_c' : return '<,>Cフィールド' ; break;
          default : return '定例会';
        }
      });
    //整形した文字列からフィールドごとの配列を作成する
    var detail_split = detail_without_img.split('<,>');
    //フィールドごとになった配列をパースする
    lib._.each(detail_split, (field, idx) => {
      //定例会であればAB不可
      if (/定例会/.test(field)) {
        item.bookable.a = false;
        item.bookable.b = false;
      } else {
        var _match = field.match(/([ABC])フィールド(.*)/);
        var fieldName = _match[1];
        var groupName = _match[2];
        //groupNameがスペースの場合は、AB貸切
        if (fieldName === 'A' && groupName === ' ') {
          item.bookable.a = false;
          item.bookable.b = false;
        } else if (groupName === '') {
          switch (true) {
            case fieldName === 'A' : item.bookable.a = true ; break;
            case fieldName === 'B' : item.bookable.b = true ; break;
            case fieldName === 'C' : item.bookable.c = true ; break;
          }
        }
      }
    });
    return item;
  };

};
