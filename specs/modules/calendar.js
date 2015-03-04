var assert = require('power-assert')
describe('calendar', () => {
  var calendar = require('../../dist/modules/calendar.js');

  describe('getCalendarObj', () => {
    var date = new Date('2015/3/3');

    it('should return calendared object', () => {
      var obj = calendar.getCalendarObj();
      console.log(obj)
      assert(obj.year === 2015);
      assert(obj.week === 10);
      assert(obj.day === 3);
    });
  });
});
