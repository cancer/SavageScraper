var assert = require('power-assert')
describe('calendar', () => {
  var calendar = require('../../module/calendar.js');
  console.log(calendar)

  describe('getCalendarObj', () => {
    var date = new Date('2015/3/3');

    it('should return calendared object', () => {
      var obj = calendar.getCalendarObj();
      assert(obj.year === '2015');
      assert(obj.week === '3');
      assert(obj.day === '3');
      assert(obj.time === '0');
    });

    it('should be false', () => {
      assert(false === true);
    });
  });
});
