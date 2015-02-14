'use strict';

var lib = require('./_lib');
var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();

module.exports = function(request, response){

  lib.client.fetch('https://www.google.com/calendar/feeds/gisvgsbqur4j1rjn890nh3kfeo@group.calendar.google.com/public/basic?alt=json', {
      normalizeWhitespace: true,
      decodeEntities: true
  }, function(err, $, res){
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
    response.send(weekEnd.map(function(val){
      var bookable = lib._.contains(reserved, val);
      return {
        date: val,
        period: 'Day',
        bookable: bookable
      };
    }));
  });
};

