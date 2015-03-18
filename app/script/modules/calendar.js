'use strict';

var lib = require('./_lib');

var calendar = {};

// { 1: mon, 2: tue, 3: wed, 4: thu, 5: fri, 6: sat, 7: sun }
calendar.weekEnds = [6, 7];

calendar.getCalendarObj = (date) => {
  var isoAry = moment(date).isocalendar();
  return {
    year: isoAry[0],
    week: isoAry[1],
    day:  isoAry[2],
    time: isoAry[3]
  };
};

/*
 * calendar.getDaysOfWeek('2015/4' || new Date('2015/4') || moment('2015/4'));
 * // [ { date: moment('2015/4/4'),  week: 0, day: 6 },
 * //   { date: moment('2015/4/5'),  week: 0, day: 0 }
 * //   :
 * //   { date: moment('2015/4/26'), week: 3, day: 0 } ]
 */
calendar.getWeekEnds = (month) => {
  month = moment(month);
  var cal = calendar.getCalendarObj(month);
  var i = 0;
  var result = [];

  while(true){
    var res = calendar.weekEnds.reduce((memo, day) => {
      var week = cal.week + i;
      var date = moment.fromIsocalendar([cal.year, week, day, 0]);
      // 月が変わったらpushしない
      if(date.isAfter(month.endOf('month'))){
        return memo;
      }
      var ret = {
        year: cal.year,
        date: date,
        week: day === 7 ? i + 1 : i,
        day: day === 7 ? 0 : day,
        isoWeek: i,
        isoDay: day,
      };

      // 月初に先月末が含まれてしまうので除外する
      if(date.isBefore(month.startOf('month'))) ret.omit = true
      memo.push(ret);
      return memo;
    }, []);

    result.push(lib._.filter(res, (val) => { return !val.omit }));

    // 配列の数が2未満になったら月が変わったとみなす
    if(res.length < 2) break;
    i++;
  }

  result = lib._.flatten(result);
  // 日曜から始まる月は全体的に1週戻す
  if(cal.day === 7) {
    result.forEach((v, i, org) => {
      org[i].week = v.week - 1;
    });
  }

  return result;
};

module.exports = calendar;
