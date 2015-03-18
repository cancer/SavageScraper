'use strict';
var assert = require('power-assert');
describe('calendar', function () {
    var calendar = require('../../dist/modules/calendar.js');
    describe('getCalendarObj', function () {
        var date = new Date('2015/3/3');
        it('should return calendared object', function () {
            var obj = calendar.getCalendarObj(date);
            assert(assert._expr(assert._capt(assert._capt(assert._capt(obj, 'arguments/0/left/object').year, 'arguments/0/left') === 2015, 'arguments/0'), {
                content: 'assert(obj.year === 2015)',
                filepath: '/Users/cancer/works/sandbox/SavageScraper/specs/modules/calendar.js',
                line: 12
            }));
            assert(assert._expr(assert._capt(assert._capt(assert._capt(obj, 'arguments/0/left/object').week, 'arguments/0/left') === 10, 'arguments/0'), {
                content: 'assert(obj.week === 10)',
                filepath: '/Users/cancer/works/sandbox/SavageScraper/specs/modules/calendar.js',
                line: 13
            }));
            assert(assert._expr(assert._capt(assert._capt(assert._capt(obj, 'arguments/0/left/object').day, 'arguments/0/left') === 2, 'arguments/0'), {
                content: 'assert(obj.day === 2)',
                filepath: '/Users/cancer/works/sandbox/SavageScraper/specs/modules/calendar.js',
                line: 14
            }));
        });
    });
});