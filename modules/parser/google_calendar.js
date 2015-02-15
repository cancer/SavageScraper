'use strict';
var lib = require('../_lib');
var fetch = require('../fetch');
var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();

module.exports = function(url){
  var options = {
    normalizeWhitespace: true,
    decodeEntities: true
  };
  var deferred = Promise.defer();

  fetch(url, options).then(($, res) => {
    var reserved = JSON.parse(entities.decode($.html())).feed.entry.map(function(val){
      return lib.moment(new Date(val.content.$t.match(/開始日: (.*)<br \/>/i)[1])).format('MM/DD dddd');
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
      var bookable = lib._.contains(reserved, val);
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

