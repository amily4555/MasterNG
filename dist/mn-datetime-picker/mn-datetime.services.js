"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_date_class_1 = require("./mn-date.class");
var MnDatetimeServices = (function () {
    function MnDatetimeServices() {
    }
    MnDatetimeServices.prototype.getRangeDate = function (rule) {
        var mndate = new mn_date_class_1.MnDate(new Date());
        var _range_map = {
            y: 'year_range',
            M: 'month_range',
            d: 'range',
            w: 'week_range',
            q: 'quarter_range'
        };
        var _rule = function (rule) {
            var regx = /(([-+]|)\d{1,})([:]|)([yMdhmsSqw])$/i;
            var rst = (rule || '').match(regx);
            return [rst[1], rst[4], rst[3]];
        };
        var _getRangeDate = function (diff, type, begin) {
            diff = parseInt((diff + ''), 10);
            var _map = {
                y: 'yoy',
                M: 'mom',
                d: 'dod',
                h: 'sos',
                m: 'sos',
                s: 'sos',
                S: 'sos',
                q: 'qoq',
                w: 'wow',
            };
            // todo mom -> mm
            return mndate[_map[type]](diff, begin);
        };
        console.debug(rule);
        // if (mu.isNotExist(rule)) {
        //     return;
        // }
        var _a = rule.split(','), _r1 = _a[0], _r2 = _a[1];
        var _start, _end;
        var _endType;
        mu.run(mu.trim(_r1 || ''), function (_r1) {
            var _rst = _rule(_r1) || [];
            var _diff = _rst[0], _type = _rst[1], _begin = _rst[2];
            _endType = !!_begin;
            _start = _getRangeDate(_diff, _type, _endType);
            console.debug(_start);
        });
        _end = mu.run(mu.trim(_r2 || ''), function (_r2) {
            var _rst = _rule(_r2) || [];
            var _diff = _rst[0], _type = _rst[1], _begin = _rst[2];
            _end = _getRangeDate(_diff, _type, _begin);
            if (_begin) {
                _end = _start[_range_map[_type]].end;
                // _start = _start[_range_map[_type]].start;
            }
        });
        if (!_end) {
            if (_endType) {
                //todo 计算获得结束时间
            }
            else {
                _end = mndate;
            }
        }
        var rst = [_start, _end].sort(function (a, b) {
            return a.days.start > b.days.start ? 1 : -1;
        });
        return {
            startDate: rst[0],
            endDate: rst[1],
        };
    };
    MnDatetimeServices.prototype.reStartDate = function (startDate, maxDate, minDate) {
        if (!startDate) {
            return startDate;
        }
        if (maxDate || minDate) {
            if (minDate && (startDate.days.start < minDate.days.start)) {
                startDate = minDate;
            }
            if (maxDate && (startDate.days.start > maxDate.days.start)) {
                startDate = maxDate;
            }
        }
        return startDate;
    };
    MnDatetimeServices.prototype.reEndDate = function (endDate, maxDate, minDate) {
        if (!endDate) {
            return endDate;
        }
        if (maxDate || minDate) {
            if (maxDate && endDate.days.start > maxDate.days.start) {
                endDate = maxDate;
            }
            if (minDate && minDate.days.start > endDate.days.start) {
                endDate = minDate;
            }
        }
        return endDate;
    };
    /**
     * 一个基于MasterNG的时间格式
     * @param {string | number | any} date
     * @param {string} dateType
     * @return {any}
     */
    // mndate(date: string | number | any, dateType: string = 'day') {
    //     const type = mu.type(date);
    //     let _date;
    //
    //     let _parmas = [2017, 0, 1, 0, 0, 0, 0];
    //
    //
    //
    //     switch (type) {
    //         case 'object':
    //             return date;
    //         case 'number':
    //             _date = new Date(date);
    //             break;
    //         case 'date':
    //             _date = new Date(date);
    //             break;
    //         case 'string':
    //             date = mu.trim(date);
    //             /**
    //              * yyyy-MM-dd 转为 yyyy/MM/dd
    //              * new Date(yyyy/MM/dd) 为原点值
    //              */
    //             _date = date.replace(/-/gi, '/');
    //             _date = new Date(_date);
    //             break;
    //         default:
    //             return date;
    //     }
    //
    //     const year = _date.getFullYear();
    //     const month = _date.getMonth() + 1;
    //     // 当前周几
    //     const weekday = _date.getDay();
    //     // 当前日期
    //     const day = _date.getDate();
    //     // 当前处在第几季度
    //     const quarter = Math.ceil(month / 3);
    //     // 该时间戳
    //     const current = +_date;
    //
    //     // 获取当前日子的时间范围
    //     const range = mu.run(new Date(_date), _ => {
    //         _.setHours(0);
    //         _.setMinutes(0);
    //         _.setSeconds(0);
    //         _.setMilliseconds(0);
    //         const start = +_;
    //         return {
    //             start,
    //             end: start + 86400000 - 1
    //         };
    //     });
    //
    //     const month_range = mu.run(new Date(_date), _ => {
    //         let start, end, first_day_weekday, last_day, last_day_weekday;
    //         _.setDate(1);
    //         _.setHours(0);
    //         _.setMinutes(0);
    //         _.setSeconds(0);
    //         _.setMilliseconds(0);
    //         start = +_;
    //         first_day_weekday = _.getDay();
    //
    //         _.setMonth(month);
    //         _.setDate(0);
    //         _.setHours(23);
    //         _.setMinutes(59);
    //         _.setSeconds(59);
    //         _.setMilliseconds(999);
    //         end = +_;
    //
    //         last_day = _.getDate();
    //         last_day_weekday = _.getDay();
    //
    //         return {
    //             start,
    //             end,
    //             last_day,
    //             first_day_weekday,
    //             last_day_weekday
    //         };
    //     });
    //
    //     const year_range = mu.run(new Date(_date), _ => {
    //         let start, end, days;
    //         _.setMonth(0);
    //         _.setDate(1);
    //         _.setHours(0);
    //         _.setMinutes(0);
    //         _.setSeconds(0);
    //         _.setMilliseconds(0);
    //         start = +_;
    //
    //         _.setMonth(11);
    //         _.setDate(31);
    //         _.setHours(23);
    //         _.setMinutes(59);
    //         _.setSeconds(59);
    //         _.setMilliseconds(999);
    //         end = +_;
    //         days = Math.ceil((end - start) / 86400000);
    //         return {
    //             start,
    //             end,
    //             days
    //         };
    //     });
    //
    //     // 年
    //     let yoy = (count: number = 1, begin: boolean = false) => {
    //         let __date = new Date(_date);
    //         __date.setFullYear(year + count);
    //         if (begin) {
    //             __date.setMonth(0);
    //             __date.setDate(1);
    //             __date.setHours(0);
    //             __date.setMinutes(0);
    //             __date.setSeconds(0);
    //             __date.setMilliseconds(0);
    //         }
    //         return this.mndate(__date, 'year_range');
    //     };
    //
    //     // 获得同比时间信息
    //     /**
    //      *
    //      * @param {number} count
    //      * @param {boolean} begin
    //      *        begin, 决定range值的始末值，默认为相对值，
    //      *        begin -> false ::: 2017-07-18 上个月为  2017-06-18 - 2017-07-17
    //      *        begin -> true  ::: 2017-07-18 上个月为  2017-06-01 - 2017-06-30
    //      * @return any;
    //      */
    //     let mom = (count: number = 1, begin: boolean = false) => {
    //         let __date = new Date(_date);
    //         __date.setMonth(month - 1 + count);
    //
    //         if (begin) {
    //             __date.setDate(1);
    //             __date.setHours(0);
    //             __date.setMinutes(0);
    //             __date.setSeconds(0);
    //             __date.setMilliseconds(0);
    //         }
    //
    //         return this.mndate(__date, 'month_range');
    //     };
    //
    //     // 季度
    //     let qoq = (count: number = 1, begin: boolean = false) => {
    //         count = count * 3;
    //         return mom(count, begin);
    //     };
    //
    //     // 周
    //     let wow = (count: number = 1, begin: boolean = false) => {
    //         let __date = new Date(_date);
    //         __date.setDate(day + 7 * count);
    //
    //         if (begin) {
    //             __date.setDate(__date.getDate() - weekday);
    //             __date.setHours(0);
    //             __date.setMinutes(0);
    //             __date.setSeconds(0);
    //             __date.setMilliseconds(0);
    //         }
    //         return this.mndate(__date);
    //     };
    //
    //     // 天
    //     let dod = (count: number = 1, begin: boolean = false) => {
    //         let __date = new Date(_date);
    //         __date.setDate(day + count);
    //
    //         if (begin) {
    //             __date.setHours(0);
    //             __date.setMinutes(0);
    //             __date.setSeconds(0);
    //             __date.setMilliseconds(0);
    //         }
    //         return this.mndate(__date, 'range');
    //     };
    //
    //     return {
    //         year,
    //         quarter,
    //         month,
    //         weekday,
    //         day,
    //         current,
    //         range,
    //         month_range,
    //         year_range,
    //         date,
    //         mom,
    //         yoy,
    //         wow,
    //         qoq,
    //         dod,
    //         dateType,
    //         _date: mu.format(_date, 'yyyy-MM-dd hh:mm:ss.SS')
    //     };
    //
    // }
    /**
     * 获得当前时间的视图数据
     * @param _date
     * @param {string} view
     */
    MnDatetimeServices.prototype.getCalendar = function (_date, view) {
        var _views;
        switch (view) {
            case 'days':
                return this.getCalendarWithDays(_date);
            case 'weeks':
                return this.getCalendarWithWeeks(_date);
            case 'months':
                return this.getCalendarWithMonths(_date);
            case 'quarters':
                return this.getCalendarWithQuarters(_date);
            case 'years':
                return this.getCalendarWithYears(_date);
        }
    };
    MnDatetimeServices.prototype.getCalendarWithDays = function (_date) {
        _date = new mn_date_class_1.MnDate(_date);
        var _cds = mu.map(6, function (i) {
            return new Array(7);
        }, []);
    };
    MnDatetimeServices.prototype.getCalendarWithWeeks = function (_date) {
    };
    MnDatetimeServices.prototype.getCalendarWithMonths = function (_date) {
    };
    MnDatetimeServices.prototype.getCalendarWithQuarters = function (_date) {
    };
    MnDatetimeServices.prototype.getCalendarWithYears = function (_date) {
    };
    return MnDatetimeServices;
}());
MnDatetimeServices.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
MnDatetimeServices.ctorParameters = function () { return []; };
exports.MnDatetimeServices = MnDatetimeServices;
//# sourceMappingURL=mn-datetime.services.js.map