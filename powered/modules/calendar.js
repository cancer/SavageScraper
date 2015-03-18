'use strict';
var assert = require('power-assert');
describe('calendar', function () {
    var calendar = require('../../dist/modules/calendar.js');
    describe('getCalendarObj', function () {
        it('should return calendared object of 2015/3/3', function () {
            var date = new Date('2015/3/3');
            var obj = calendar.getCalendarObj(date);
            assert(assert._expr(assert._capt(assert._capt(assert._capt(obj, 'arguments/0/left/object').year, 'arguments/0/left') === 2015, 'arguments/0'), {
                content: 'assert(obj.year === 2015)',
                filepath: '/Users/cancer/works/sandbox/SavageScraper/specs/modules/calendar.js',
                line: 11
            }));
            assert(assert._expr(assert._capt(assert._capt(assert._capt(obj, 'arguments/0/left/object').week, 'arguments/0/left') === 10, 'arguments/0'), {
                content: 'assert(obj.week === 10)',
                filepath: '/Users/cancer/works/sandbox/SavageScraper/specs/modules/calendar.js',
                line: 12
            }));
            assert(assert._expr(assert._capt(assert._capt(assert._capt(obj, 'arguments/0/left/object').day, 'arguments/0/left') === 2, 'arguments/0'), {
                content: 'assert(obj.day === 2)',
                filepath: '/Users/cancer/works/sandbox/SavageScraper/specs/modules/calendar.js',
                line: 13
            }));
        });
    });
    describe('getWeekEnds', function () {
        var month = new Date('2015/3');
        it('should return week ends array', function () {
            var weekEnds = calendar.getWeekEnds(month);
            assert(assert._expr(assert._capt(assert._capt(assert._capt(weekEnds, 'arguments/0/left/object').length, 'arguments/0/left') === 9, 'arguments/0'), {
                content: 'assert(weekEnds.length === 9)',
                filepath: '/Users/cancer/works/sandbox/SavageScraper/specs/modules/calendar.js',
                line: 22
            }));
            assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(assert._capt(weekEnds, 'arguments/0/left/callee/object/object/object')[0], 'arguments/0/left/callee/object/object').date, 'arguments/0/left/callee/object').format('YYYY/MM/DD'), 'arguments/0/left') === '2015/03/01', 'arguments/0'), {
                content: 'assert(weekEnds[0].date.format("YYYY/MM/DD") === "2015/03/01")',
                filepath: '/Users/cancer/works/sandbox/SavageScraper/specs/modules/calendar.js',
                line: 23
            }));
            assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(weekEnds, 'arguments/0/left/object/object')[0], 'arguments/0/left/object').year, 'arguments/0/left') === 2015, 'arguments/0'), {
                content: 'assert(weekEnds[0].year === 2015)',
                filepath: '/Users/cancer/works/sandbox/SavageScraper/specs/modules/calendar.js',
                line: 24
            }));
            assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(weekEnds, 'arguments/0/left/object/object')[0], 'arguments/0/left/object').week, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(weekEnds[0].week === 0)',
                filepath: '/Users/cancer/works/sandbox/SavageScraper/specs/modules/calendar.js',
                line: 25
            }));
            assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(weekEnds, 'arguments/0/left/object/object')[0], 'arguments/0/left/object').day, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(weekEnds[0].day === 0)',
                filepath: '/Users/cancer/works/sandbox/SavageScraper/specs/modules/calendar.js',
                line: 26
            }));
            assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(weekEnds, 'arguments/0/left/object/object')[0], 'arguments/0/left/object').isoDay, 'arguments/0/left') === 7, 'arguments/0'), {
                content: 'assert(weekEnds[0].isoDay === 7)',
                filepath: '/Users/cancer/works/sandbox/SavageScraper/specs/modules/calendar.js',
                line: 27
            }));
            assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(assert._capt(weekEnds, 'arguments/0/left/callee/object/object/object')[8], 'arguments/0/left/callee/object/object').date, 'arguments/0/left/callee/object').format('YYYY/MM/DD'), 'arguments/0/left') === '2015/03/29', 'arguments/0'), {
                content: 'assert(weekEnds[8].date.format("YYYY/MM/DD") === "2015/03/29")',
                filepath: '/Users/cancer/works/sandbox/SavageScraper/specs/modules/calendar.js',
                line: 28
            }));
            assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(weekEnds, 'arguments/0/left/object/object')[8], 'arguments/0/left/object').year, 'arguments/0/left') === 2015, 'arguments/0'), {
                content: 'assert(weekEnds[8].year === 2015)',
                filepath: '/Users/cancer/works/sandbox/SavageScraper/specs/modules/calendar.js',
                line: 29
            }));
            assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(weekEnds, 'arguments/0/left/object/object')[8], 'arguments/0/left/object').week, 'arguments/0/left') === 4, 'arguments/0'), {
                content: 'assert(weekEnds[8].week === 4)',
                filepath: '/Users/cancer/works/sandbox/SavageScraper/specs/modules/calendar.js',
                line: 30
            }));
            assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(weekEnds, 'arguments/0/left/object/object')[8], 'arguments/0/left/object').day, 'arguments/0/left') === 0, 'arguments/0'), {
                content: 'assert(weekEnds[8].day === 0)',
                filepath: '/Users/cancer/works/sandbox/SavageScraper/specs/modules/calendar.js',
                line: 31
            }));
            assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(weekEnds, 'arguments/0/left/object/object')[8], 'arguments/0/left/object').isoDay, 'arguments/0/left') === 7, 'arguments/0'), {
                content: 'assert(weekEnds[8].isoDay === 7)',
                filepath: '/Users/cancer/works/sandbox/SavageScraper/specs/modules/calendar.js',
                line: 32
            }));
        });
    });
});