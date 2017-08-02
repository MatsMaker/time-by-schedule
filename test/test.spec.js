'use strict';

const chai = require('chai');
const expect = chai.expect;

const durationByCalendar = require('../src/time-by-schedule.js');
const Timetable = durationByCalendar.Timetable;

const SCHEDULE = [
    { // 0, not has exceptions
        week: [
            {
                indexOfday: 0,
                from: 28800,
                to: 63000,
                isActive: true
            }, {
                indexOfday: 1,
                from: 28800,
                to: 63000,
                isActive: true
            }, {
                indexOfday: 2,
                from: 28800,
                to: 63000,
                isActive: true
            }, {
                indexOfday: 3,
                from: 28800,
                to: 63000,
                isActive: true
            }, {
                indexOfday: 4,
                from: 28800,
                to: 63000,
                isActive: true
            }, {
                indexOfday: 5,
                from: null,
                to: null,
                isActive: false
            }, {
                indexOfday: 6,
                from: null,
                to: null,
                isActive: false
            }
        ],
        exceptions: []
    }, { // 1, has one exception
        week: [
            {
                indexOfday: 0,
                from: 28800,  // 8:00 AM
                to: 63000,    // 5:30 PM
                isActive: true
            }, {
                indexOfday: 1,
                from: 28800,
                to: 63000,
                isActive: true
            }, {
                indexOfday: 2,
                from: 28800,
                to: 63000,
                isActive: true
            }, {
                indexOfday: 3,
                from: 28800,
                to: 63000,
                isActive: true
            }, {
                indexOfday: 4,
                from: 28800,
                to: 63000,
                isActive: true
            }, {
                indexOfday: 5,
                from: null,
                to: null,
                isActive: false
            }, {
                indexOfday: 6,
                from: null,
                to: null,
                isActive: false
            }
        ],
        exceptions: [{
            date: '2017-04-19T08:45:56.053Z',
            from: 28800,
            to: 63000,
            isActive: false
        }]
    }, { // 2, has two exception on different weeks
        week: [
            {
                indexOfday: 0,
                from: 28800,  // 8:00 AM
                to: 63000,    // 5:30 PM
                isActive: true
            }, {
                indexOfday: 1,
                from: 28800,
                to: 63000,
                isActive: true
            }, {
                indexOfday: 2,
                from: 28800,
                to: 63000,
                isActive: true
            }, {
                indexOfday: 3,
                from: 28800,
                to: 63000,
                isActive: true
            }, {
                indexOfday: 4,
                from: 28800,
                to: 63000,
                isActive: true
            }, {
                indexOfday: 5,
                from: null,
                to: null,
                isActive: false
            }, {
                indexOfday: 6,
                from: null,
                to: null,
                isActive: false
            }
        ],
        exceptions: [{
            date: '2017-04-19T08:45:56.053Z',
            from: 28800,
            to: 63000,
            isActive: false
        }, {
            date: '2017-04-26T08:45:56.053Z',
            from: 32400,
            to: 50400,
            isActive: true
        }]
    }, { // 3, has two exception on one week
        week: [
            {
                indexOfday: 0,
                from: 28800,  // 8:00 AM
                to: 63000,    // 5:30 PM
                isActive: true
            }, {
                indexOfday: 1,
                from: 28800,
                to: 63000,
                isActive: true
            }, {
                indexOfday: 2,
                from: 28800,
                to: 63000,
                isActive: true
            }, {
                indexOfday: 3,
                from: 28800,
                to: 63000,
                isActive: true
            }, {
                indexOfday: 4,
                from: 28800,
                to: 63000,
                isActive: true
            }, {
                indexOfday: 5,
                from: null,
                to: null,
                isActive: false
            }, {
                indexOfday: 6,
                from: null,
                to: null,
                isActive: false
            }
        ],
        exceptions: [{
            date: '2017-04-19T08:45:56.053Z',
            from: 28800,
            to: 63000,
            isActive: false
        }, {
            date: '2017-04-20T08:45:56.053Z',
            from: 32400,
            to: 50400,
            isActive: true
        }]
    }, { // 4, has tree exception on one week and one other week
        week: [
            {
                indexOfday: 0,
                from: 28800,  // 8:00 AM
                to: 63000,    // 5:30 PM
                isActive: true
            }, {
                indexOfday: 1,
                from: 28800,
                to: 63000,
                isActive: true
            }, {
                indexOfday: 2,
                from: 28800,
                to: 63000,
                isActive: true
            }, {
                indexOfday: 3,
                from: 28800,
                to: 63000,
                isActive: true
            }, {
                indexOfday: 4,
                from: 28800,
                to: 63000,
                isActive: true
            }, {
                indexOfday: 5,
                from: null,
                to: null,
                isActive: false
            }, {
                indexOfday: 6,
                from: null,
                to: null,
                isActive: false
            }
        ],
        exceptions: [{
            date: '2017-04-19T08:45:56.053Z',
            from: 28800,
            to: 63000,
            isActive: false
        }, {
            date: '2017-04-20T08:45:56.053Z',
            from: 32400,
            to: 50400,
            isActive: true
        }, {
            date: '2017-04-27T08:45:56.053Z',
            from: 32400,
            to: 50400,
            isActive: false
        }]
    }, { // 5, has tree exception on one week and one other week, other schedule
        week: [
            {
                indexOfday: 0,
                from: 32400,
                to: 64800,
                isActive: true
            }, {
                indexOfday: 1,
                from: 32400,
                to: 64800,
                isActive: true
            }, {
                indexOfday: 2,
                from: 32400,
                to: 64800,
                isActive: true
            }, {
                indexOfday: 3,
                from: 32400,
                to: 64800,
                isActive: true
            }, {
                indexOfday: 4,
                from: 32400,
                to: 64800,
                isActive: true
            }, {
                indexOfday: 5,
                from: null,
                to: null,
                isActive: false
            }, {
                indexOfday: 6,
                from: null,
                to: null,
                isActive: false
            }
        ],
        exceptions: [{
            date: '2017-04-19T08:45:56.053Z',
            from: 28800,
            to: 63000,
            isActive: false
        }, {
            date: '2017-04-20T08:45:56.053Z',
            from: 32400,
            to: 50400,
            isActive: true
        }, {
            date: '2017-04-27T08:45:56.053Z',
            from: 32400,
            to: 50400,
            isActive: false
        }]
    }
];
const TIMES = [
    1492351200, // 2017-04-16T14:00:00
    1492437600, // 2017-04-17T14:00:00, day of week is monday
    1492459200, // 2017-04-17T20:00:00
    1492470000, // 2017-04-17T23:00:00
    1492768800, // 2017-04-21T10:00:00, day of week is friday
    1493164799, // 2017-04-25T23:59:59
    1493200800, // 2017-04-26T10:00:00
    1493647200, // 2017-05-01T14:00:00
    1497726000  // 2017-06-17T19:00:00
];
describe('Duration of calendar by schedule', () => {
    it('2017-04-17T14:00:00 -> 2017-04-17T20:00:00 = 3:30 work time', () => {
        const timetable = new Timetable(SCHEDULE[0]);
        expect(timetable.timeOfDuration(1492437600, 1492448400)).to.deep.equal(12600);
    });
    it('2017-04-17T14:00:00 -> 2017-04-17T20:00:00 = 0:30 work time(use timeZone +03:00)', () => {
        const timetable = new Timetable(SCHEDULE[0], 'Europe/Kiev');
        expect(timetable.timeOfDuration(1492437600, 1492448400)).to.deep.equal(1800);
    });
    it('2017-04-17T14:00:00 -> 2017-04-17T20:00:00 = 5:30 work time(use timeZone -02:00)', () => {
        const timetable = new Timetable(SCHEDULE[0], 'America/Noronha');
        expect(timetable.timeOfDuration(1492437600, 1492448400)).to.deep.equal(19800);
    });
    it('2017-04-17T20:00:00 -> 2017-04-17T23:00:00 = 0 work time', () => {
        const timetable = new Timetable(SCHEDULE[0]);
        expect(timetable.timeOfDuration(1492459200, 1492470000)).to.deep.equal(0);
    });
    it('2017-04-21T10:00:00 -> 2017-04-25T23:59:59 = 26:30 work time', () => {
        const timetable = new Timetable(SCHEDULE[0]);
        expect(timetable.timeOfDuration(1492768800, 1493164799)).to.deep.equal(95400);
    });
    it('2017-04-21T10:00:00 -> 2017-04-26T10:00:00 = 28:30 work time', () => {
        const timetable = new Timetable(SCHEDULE[0]);
        expect(timetable.timeOfDuration(1492768800, 1493200800)).to.deep.equal(102600);
    });
    it('2017-04-17T14:00:00 -> 2017-05-01T14:00:00 = 91:30 work time', () => {
        const timetable = new Timetable(SCHEDULE[0]);
        expect(timetable.timeOfDuration(1492437600, 1493647200)).to.deep.equal(342000);
    });
    it('2017-04-17T14:00:00 -> 2017-06-17T19:00:00 = 421:30 work time', () => {
        const timetable = new Timetable(SCHEDULE[0]);
        expect(timetable.timeOfDuration(1492437600, 1497726000)).to.deep.equal(1517400);
    });
    it('2017-04-16T14:00:00 -> 2017-05-01T14:00:00 = 101:00 work time', () => {
        const timetable = new Timetable(SCHEDULE[0]);
        expect(timetable.timeOfDuration(1492351200, 1493647200)).to.deep.equal(363600);
    });
    it('2017-04-16T14:00:00 -> 2017-05-01T14:00:00 = 91:30 work time, has one exceptions', () => {
        const timetable = new Timetable(SCHEDULE[1]);
        expect(timetable.timeOfDuration(1492351200, 1493647200)).to.deep.equal(329400);
    });
    it('2017-04-16T14:00:00 -> 2017-05-01T14:00:00 = 87:00 work time, has two exceptions on different week', () => {
        const timetable = new Timetable(SCHEDULE[2]);
        expect(timetable.timeOfDuration(1492351200, 1493647200)).to.deep.equal(313200);
    });
    it('2017-04-16T14:00:00 -> 2017-05-01T14:00:00 = 87:00 work time, has two exceptions on one week', () => {
        const timetable = new Timetable(SCHEDULE[3]);
        expect(timetable.timeOfDuration(1492351200, 1493647200)).to.deep.equal(313200);
    });
    it('2017-04-16T14:00:00 -> 2017-05-01T14:00:00 = 77:30 work time, has tree exceptions on one week and one on next week', () => {
        const timetable = new Timetable(SCHEDULE[4]);
        expect(timetable.timeOfDuration(1492351200, 1493647200)).to.deep.equal(279000);
    });
    it('2017-04-16T14:00:00 -> 2017-05-01T14:00:00 = 73:00 work time, has tree exceptions on one week and one on next week, other schedule', () => {
        const timetable = new Timetable(SCHEDULE[5]);
        expect(timetable.timeOfDuration(1492351200, 1493647200)).to.deep.equal(262800);
    });
});
