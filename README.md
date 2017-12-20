# Time by schedule

Small utility for calculate work time by schedule

npm package https://www.npmjs.com/package/@mats-maker/schedule-calendar

### Example:

We have week schedule with exceptions:

```javascript
          [
            {
                indexOfday: 0,   // Index of day
                from: 28800,     // 8:00 AM Start of work day this is number seconds from start the day
                to: 63000,       // 5:30 PM End of work day this is number seconds from start the day
                isActive: true   // Toggler - active or not active this day. Possibly will need when schedule will be editing and need show some time
            }, {
                indexOfday: 1,
                from: 28800,
                to: 63000,
                isActive: true
            }, 
            ...
            ...
            {
                indexOfday: 4,
                from: 28800,
                to: 63000,
                isActive: true
            }, {
                indexOfday: 5,
                from: null,   // saturday is day of rest
                to: null,     // saturday is day of rest
                isActive: false
            }, {
                indexOfday: 6,
                from: null,   // sunday is day of rest
                to: null,     // sunday is day of rest
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
        }
```
 We will have **from 2017-04-16T14:00:00 to 2017-05-01T14:00:00 result 87:00 work time**, has two exceptions on different week
 
 
 ## How it use

```javascript
const shedule = {
        week: [
            {
                indexOfday: 0,          // Index of day 0-6
                from: 28800,            // Start of work day this is number seconds from start the day
                to: 63000,              // End of work day this is number seconds from start the day
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
        exceptions: [] // also you can set exceptions
    };
const timetable = new Timetable(shedule);
const startTimeDuration = 1492437600                              // 2017-04-17T14:00:00
const endTimeDuration = 1492448400                                // 2017-04-17T20:00:00
const result = timetable.timeOfDuration(1492437600, 1492448400)); // 12600 this is 3:30 work's time by shedule
```
