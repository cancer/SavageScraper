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
 * //   { date: moment('2015/4/5'),  week: 0, day: 7 }
 * //   :
 * //   { date: moment('2015/4/26'), week: 3, day: 7 } ]
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
        date: date,
        week: i,
        isoDay: day,
        day: day === 7 ? 0 : day
      };

      // 月初に先月末が含まれてしまうので除外する
      if(date.isBefore(month.startOf('month'))) ret.omit = true
      memo.push(ret);
      return memo;
    }, []);

    result.push(lib._.filter(res, (val) => { return !val.omit }));

    // 月が変わると配列の数が足りなくなるのでループ終了
    if(res.length < 2) break;
    i++;
  }

  return lib._.flatten(result);
};

module.exports = calendar;

