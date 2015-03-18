var assert = require('power-assert')
describe('calendar', () => {
  var calendar = require('../../dist/modules/calendar.js');

  describe('getCalendarObj', () => {
    var date = new Date('2015/3/3');

    it('should return calendared object', () => {
      var obj = calendar.getCalendarObj(date);
      assert(obj.year === 2015);
      assert(obj.week === 10);
      assert(obj.day === 2);
    });
  });

  describe('getWeekEnds', () => {
    var month = new Date('2015/3');

    it('should return week ends array', () => {
      var weekEnds = calendar.getWeekEnds(month);
      assert(weekEnds.length === 9);
      assert(weekEnds[0].date.format('YYYY/MM/DD') === '2015/03/01');
      assert(weekEnds[0].year === 2015);
      assert(weekEnds[0].week === 0);
      assert(weekEnds[0].day === 0);
      assert(weekEnds[0].isoDay === 7);
      assert(weekEnds[8].date.format('YYYY/MM/DD') === '2015/03/29');
      assert(weekEnds[8].year === 2015);
      assert(weekEnds[8].week === 4);
      assert(weekEnds[8].day === 0);
      assert(weekEnds[8].isoDay === 7);
    });
  });
});
