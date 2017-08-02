const moment = require('moment-timezone');

const MILLISECONDS_IN_SECOND = 1000;


class Timetable {

    constructor(schedule, timeZone = false) {
        this.schedule = schedule;
        this.timeZone = timeZone;
        this._timeOfWeek = this._calcTimeOfWeek();
    }

    _calcTimeOfWeek() {
        let timeOfWeek = 0;
        this.schedule.week.forEach(day => {
            timeOfWeek += day.to - day.from;
        });
        return timeOfWeek;
    }

    _datesFromTimeOfDaySchedule(date, daySchedule) {
        const startDate = date.clone().startOf('day').unix();
        return {
            end: startDate + daySchedule.to,
            start: startDate + daySchedule.from
        };
    }

    _timeOfWeekWithException(startOfWeek, endOfWeek, exceptions) {
        let diffTime = 0;
        let markerDate = startOfWeek.clone();
        while (markerDate.clone().add(1, 'days').isBefore(endOfWeek)) {
            markerDate.add(1, 'days');
            diffTime += this.timeOfDay(markerDate.isoWeekday(), exceptions.find(excep => markerDate.isSame(excep.date, 'day')));
        }
        return diffTime;
    }

    timeOfWeek(endOfWeek) {
        let time = 0;
        const startOfWeek = endOfWeek.clone().subtract(1, 'week');
        const exceptions = this.schedule.exceptions.filter(except => startOfWeek < new Date(except.date) < endOfWeek);
        if (exceptions.length) {
            time = this._timeOfWeekWithException(startOfWeek, endOfWeek, exceptions);
        } else {
            time = this._timeOfWeek;
        }
        return time;
    }

    scheduleOfDay(dayIndex) {
        let index = dayIndex - 1; // in schedule days index is 0-6, this isoWeekday is use 1-7
        return this.schedule.week.find(day => day.indexOfday === index);
    }

    timeOfDay(dayIndex, exception) {
        let result = 0;
        const currentAsDay = exception || this.scheduleOfDay(dayIndex);
        if (currentAsDay && currentAsDay.isActive) {
            result = currentAsDay.to - currentAsDay.from;
        }
        return result;
    }

    timeOfDuration(startTime, endTime, format = 'X') {
        let countTime = 0;
        if (startTime > endTime) {
            return countTime;
        }
        const startDate = (this.timeZone) ?
            moment.tz(startTime * MILLISECONDS_IN_SECOND, this.timeZone) : moment.utc(startTime, format);
        const endDate = (this.timeZone) ?
            moment.tz(endTime * MILLISECONDS_IN_SECOND, this.timeZone) : moment.utc(endTime, format);
        const markerDate = startDate.clone();

        let daySchedule = this.scheduleOfDay(markerDate.isoWeekday());
        if (daySchedule.isActive) {
            const workDate = this._datesFromTimeOfDaySchedule(markerDate, daySchedule);
            if (workDate.start < markerDate.unix() && markerDate.unix() < workDate.end) {
                countTime += workDate.end - markerDate.unix();
            }
        }
        markerDate.endOf('day');

        while (markerDate.clone().add(1, 'weeks').isBefore(endDate)) {
            markerDate.add(1, 'weeks');
            countTime += this.timeOfWeek(markerDate);
        }

        while (markerDate.clone().add(1, 'days').isBefore(endDate)) {
            markerDate.add(1, 'days');
            countTime += this.timeOfDay(markerDate.isoWeekday());
        }

        daySchedule = this.scheduleOfDay(markerDate.add(1, 'ms').isoWeekday());
        if (daySchedule.isActive) {
            const workDate = this._datesFromTimeOfDaySchedule(markerDate, daySchedule);
            if (endDate.unix() > workDate.end && startDate.unix() < workDate.start) {
                countTime += this.timeOfDay(markerDate.isoWeekday());
            } else if (workDate.start < endDate.unix() && endDate.unix() < workDate.end) {
                countTime += endDate.unix() - workDate.start;
            }
        }

        return countTime;
    }

}

function durationByCalendar(schedule, startTime, endTime, timeZone) {
    const timetable = new Timetable(schedule, timeZone);
    return timetable.timeOfDuration(startTime, endTime);
}

module.exports = {
    Timetable,
    durationByCalendar
};
