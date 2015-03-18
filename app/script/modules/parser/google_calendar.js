'use strict';
var lib = require('../_lib');
var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();

module.exports = function(account, opts){
  opts = opts || {};
  var options = {
    normalizeWhitespace: true,
    decodeEntities: true
  };
  var deferred = Promise.defer();
  //最大取得件数200件、開始順、昇順
  var url = 'https://www.google.com/calendar/feeds/'+account+'/public/basic?alt=json&max-results=200&orderby=starttime&sortorder=ascend';

  lib.client.fetch(url, options).then((result) => {
    var $ = result.$;
    var json = JSON.parse(entities.decode($.html()));
    var reserved = json.feed.entry.map(function(val){
      opts.regStr = opts.regStr || '(?:開始日|期間):\\s(.+)?\\s?\\(';
      var matches = val.content.$t.match(new RegExp(opts.regStr, 'i'))[1];
      return lib.moment(new Date(matches)).format('MM/DD dddd');
    });
    var weekEndIndex = [1, 6];
    var weekEnd = [];
    var last = +lib.moment().endOf('month').format('DD');
    var d = +lib.moment().startOf('week').format('DD') - 1;
    for(var i=0; d < last; i++){
      d = d + weekEndIndex[i%2];
      weekEnd.push(lib.moment().date(d).format('MM/DD dddd'));
    }
    deferred.resolve(weekEnd.map(function(val){
      //Googleカレンダーに入っている予定の中に
      //今月の土日の予定が入っていなければ予約できる
      var bookable = !lib._.contains(reserved, val);
      return {
        date: val,
        period: 'Day',
        bookable: bookable
      };
    }));
  }).catch((err) => {
    console.log(err);
    deferred.reject({
      error: err.msg,
      content: '非公開'
    })
  });

  return deferred.promise;
};

