"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_date_class_1 = require("./mn-date.class");
var MnDatetimePickerComponent = (function () {
    function MnDatetimePickerComponent() {
        this.result = new core_1.EventEmitter();
        this.selected = new core_1.EventEmitter();
        this._selected = {};
        this._viewed = {
            startDate: {},
            endDate: {}
        };
        this._hasChange = false;
        // 默认视图
        this._view = 'calendar';
        this._views = [
            {
                view: 'calendar',
                formatter: 'yyyy-MM-dd'
            }, {
                view: 'month',
                formatter: 'yyyy-MM-dd'
            }, {
                view: 'quarter',
                formatter: 'yyyy-MM-dd'
            }, {
                view: 'year',
                formatter: 'yyyy-MM-dd'
            }
        ];
    }
    Object.defineProperty(MnDatetimePickerComponent.prototype, "startDate", {
        set: /**
             * string: 标准的日期格式 '2017-12-08 11:05:28'
             * number: 时间戳
             * any: mndate 对象
             */
        function (date) {
            this._startDate = new mn_date_class_1.MnDate(date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDatetimePickerComponent.prototype, "endDate", {
        set: function (date) {
            this._endDate = new mn_date_class_1.MnDate(date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDatetimePickerComponent.prototype, "minDate", {
        set: function (date) {
            this._minDate = new mn_date_class_1.MnDate(date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDatetimePickerComponent.prototype, "maxDate", {
        set: function (date) {
            this._maxDate = new mn_date_class_1.MnDate(date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnDatetimePickerComponent.prototype, "views", {
        set: 
        // 设置视图
        function (items) {
            var _this = this;
            if (!items) {
                return;
            }
            this._views = mu.map(items, function (item, index) {
                if (mu.type(item, 'string')) {
                    var _a = item.split('-:>'), view = _a[0], formatter = _a[1];
                    formatter = formatter || 'yyyy-MM-dd';
                    item = {
                        view: view,
                        formatter: formatter
                    };
                }
                if (!index) {
                    _this._view = item.view;
                }
                return item;
            });
        },
        enumerable: true,
        configurable: true
    });
    MnDatetimePickerComponent.prototype._rangeResult = function (rst) {
        var _this = this;
        this._startDate = rst.startDate || this._viewed.startDate || this._selected.startDate;
        this._endDate = rst.endDate || this._viewed.endDate || this._selected.endDate;
        mu.run(rst.view, function (view) { return _this._view = view; });
    };
    MnDatetimePickerComponent.prototype.ngOnInit = function () {
        this._viewsMap = mu.map(this._views, function (o) {
            return {
                __key__: o.view,
                __val__: o.formatter
            };
        }, {});
    };
    MnDatetimePickerComponent.prototype._mcmResult = function ($event) {
        var _this = this;
        mu.run($event.startDate, function () {
            _this._viewed.startDate = $event.startDate.clone();
        });
        mu.run($event.endDate, function () {
            _this._viewed.endDate = $event.endDate.clone();
        }, function () {
            _this._viewed.endDate = void 0;
        });
        // this._startDate = $event.startDate;
        // this._endDate = $event.endDate;
        if (!this._hasChange) {
            // Hack fixed angular error
            // ERROR Error:
            //      ExpressionChangedAfterItHasBeenCheckedError:
            //      Expression has changed after it was checked
            // public ngDoCheck(): void { this.cdr.detectChanges(); }
            setTimeout(function () {
                mu.run(_this._startDate, function () {
                    _this._selected = _this._rst({
                        startDate: _this._startDate,
                        endDate: _this._endDate
                    });
                    _this.result.emit(_this._selected);
                });
            }, 0);
            this._hasChange = true;
        }
    };
    // 确认事件
    // 确认事件
    MnDatetimePickerComponent.prototype._confirmDate = 
    // 确认事件
    function () {
        this._startDate = this._viewed.startDate;
        this._endDate = this._viewed.endDate;
        this._selected = this._rst({
            startDate: this._startDate,
            endDate: this._endDate
        });
        this.selected.emit(this._selected);
        this.result.emit(this._selected);
        this._dropDownResult.hide();
    };
    MnDatetimePickerComponent.prototype._format = function (date) {
        if (!date) {
            return '';
        }
        return mu.format(date._date, this._viewsMap[this._view]);
    };
    MnDatetimePickerComponent.prototype._rst = function (rst) {
        rst.start = this._format(this._startDate);
        rst.end = this._format(this._endDate);
        return rst;
    };
    MnDatetimePickerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'mn-datetimepicker',
                    template: "\n        <mn-dropdown (mnResult)=\"_dropDownResult = $event\">\n            <mn-fill>\n                <mn-input\n                        class=\"mnc-col\"\n                        [style.minWidth.px]=\"95\"\n                        [mnReadonly]=\"true\"\n                        [mnValue]=\"_selected?.start\">\n                    <span class=\"mnc-next\">-</span>\n                </mn-input>\n                <mn-input\n                        class=\"mnc-col\"\n                        [style.minWidth.px]=\"105\"\n                        [mnReadonly]=\"true\"\n                        [mnValue]=\"_selected?.end\">\n                    <i class=\"fa fa-calendar mnc-next\"></i>\n                </mn-input>\n            </mn-fill>\n\n            <mn-dropdown-content class=\"p-8 mnc-block\">\n                <mn-fill [style.width.px]=\"660\">\n                    <mn-col [style.width.px]=\"120\">\n                        <mn-datetimeranges\n                                [mnViews]=\"_views\"\n                                (mnResult)=\"_rangeResult($event)\"\n                        ></mn-datetimeranges>\n                    </mn-col>\n                    <mn-col [span]=\"1\">\n                        <ng-container *ngIf=\"_view === 'calendar'\">\n                            <mn-calendar-multiple\n                                    [mnStartDate]=\"_startDate\"\n                                    [mnEndDate]=\"_endDate\"\n                                    [mnMinDate]=\"_minDate\"\n                                    [mnMaxDate]=\"_maxDate\"\n                                    (mnResult)=\"_mcmResult($event)\"\n                            ></mn-calendar-multiple>\n                        </ng-container>\n\n                        <ng-container *ngIf=\"_view === 'year'\">\n                            <mn-yearspicker\n                                    [mnStartDate]=\"_startDate\"\n                                    [mnEndDate]=\"_endDate\"\n                                    [mnMinDate]=\"_minDate\"\n                                    [mnMaxDate]=\"_maxDate\"\n                                    (mnResult)=\"_mcmResult($event)\"\n                            ></mn-yearspicker>\n                        </ng-container>\n\n                        <ng-container *ngIf=\"_view === 'month'\">\n                            <mn-monthspicker\n                                    [mnStartDate]=\"_startDate\"\n                                    [mnEndDate]=\"_endDate\"\n                                    [mnMinDate]=\"_minDate\"\n                                    [mnMaxDate]=\"_maxDate\"\n                                    (mnResult)=\"_mcmResult($event)\"\n                            ></mn-monthspicker>\n                        </ng-container>\n\n                        <ng-container *ngIf=\"_view === 'quarter'\">\n                            <mn-quarterspicker\n                                    [mnStartDate]=\"_startDate\"\n                                    [mnEndDate]=\"_endDate\"\n                                    [mnMinDate]=\"_minDate\"\n                                    [mnMaxDate]=\"_maxDate\"\n                                    (mnResult)=\"_mcmResult($event)\"\n                            ></mn-quarterspicker>\n                        </ng-container>\n\n                        <mn-fill class=\"mt-8\">\n                            <mn-col [span]=\"1\" class=\"pt-2 mnc-mark\">\n                                {{_viewed.startDate?._date | mu: 'format' : _viewsMap[_view] }}\n                                <ng-container *ngIf=\"_viewed.startDate\">-</ng-container>\n                                {{_viewed.endDate?._date | mu: 'format' : _viewsMap[_view] }}\n                            </mn-col>\n                            <mn-col [style.width.px]=\"120\" class=\"mnc-tr\">\n                                <button mn-btn class=\"primary\"\n                                        [disabled]=\"!_viewed.endDate\"\n                                        (click)=\"_confirmDate()\">\u786E\u8BA4\n                                </button>\n                            </mn-col>\n                        </mn-fill>\n                    </mn-col>\n                </mn-fill>\n            </mn-dropdown-content>\n        </mn-dropdown>\n    ",
                    encapsulation: core_1.ViewEncapsulation.None,
                    styles: ['mn-calendar-multiple,mn-datetimeranges,mn-calendar,mn-yearspicker,mn-monthspicker,mn-quarterspicker {  display: block;}mn-quarterspicker mn-fill mn-col .mn-col-content,mn-monthspicker mn-fill mn-col .mn-col-content {  padding: 4px;}mn-quarterspicker mn-fill mn-col .mn-col-content .mnc-quarterspicker-name,mn-monthspicker mn-fill mn-col .mn-col-content .mnc-quarterspicker-name,mn-quarterspicker mn-fill mn-col .mn-col-content .mnc-monthspicker-month,mn-monthspicker mn-fill mn-col .mn-col-content .mnc-monthspicker-month {  text-align: right;  font-size: 15px;  line-height: 1.5;}mn-quarterspicker mn-fill mn-col .mn-col-content .mnc-quarterspicker-year,mn-monthspicker mn-fill mn-col .mn-col-content .mnc-quarterspicker-year,mn-quarterspicker mn-fill mn-col .mn-col-content .mnc-monthspicker-year,mn-monthspicker mn-fill mn-col .mn-col-content .mnc-monthspicker-year {  text-align: right;  font-size: 13px;  color: #999;  line-height: 1.5;}mn-yearspicker,mn-monthspicker,mn-quarterspicker {  padding: 8px;  border: 1px solid #d9d9d9;  min-height: 300px;  max-height: 300px;  overflow-y: auto;}mn-yearspicker section,mn-monthspicker section,mn-quarterspicker section {  padding-bottom: 8px;}mn-yearspicker section + section,mn-monthspicker section + section,mn-quarterspicker section + section {  padding-top: 8px;  margin-top: 8px;  border-top: 1px solid #d9d9d9;}mn-yearspicker mn-fill mn-col,mn-monthspicker mn-fill mn-col,mn-quarterspicker mn-fill mn-col {  text-align: center;  line-height: 28px;  font-size: 14px;  cursor: pointer;}mn-yearspicker mn-fill mn-col.range .mn-col-content,mn-monthspicker mn-fill mn-col.range .mn-col-content,mn-quarterspicker mn-fill mn-col.range .mn-col-content {  background: #e2f2fe;}mn-yearspicker mn-fill mn-col.range-reverse .mn-col-content,mn-monthspicker mn-fill mn-col.range-reverse .mn-col-content,mn-quarterspicker mn-fill mn-col.range-reverse .mn-col-content {  background: #fef2e2;}mn-yearspicker mn-fill mn-col.selected .mn-col-content,mn-monthspicker mn-fill mn-col.selected .mn-col-content,mn-quarterspicker mn-fill mn-col.selected .mn-col-content {  background: rgba(61, 168, 245, 0.6);  border-radius: 2px;}mn-yearspicker mn-fill mn-col.start .mn-col-content,mn-monthspicker mn-fill mn-col.start .mn-col-content,mn-quarterspicker mn-fill mn-col.start .mn-col-content {  background: rgba(61, 168, 245, 0.3);  border-radius: 2px;}mn-yearspicker mn-fill mn-col.end .mn-col-content,mn-monthspicker mn-fill mn-col.end .mn-col-content,mn-quarterspicker mn-fill mn-col.end .mn-col-content {  background: rgba(61, 168, 245, 0.5);  border-radius: 2px;}mn-yearspicker mn-fill mn-col.no-selected,mn-monthspicker mn-fill mn-col.no-selected,mn-quarterspicker mn-fill mn-col.no-selected {  cursor: not-allowed;}mn-yearspicker mn-fill mn-col.no-selected .mn-col-content,mn-monthspicker mn-fill mn-col.no-selected .mn-col-content,mn-quarterspicker mn-fill mn-col.no-selected .mn-col-content {  color: #aaa;  text-decoration: line-through;}mn-yearspicker mn-fill + mn-fill,mn-monthspicker mn-fill + mn-fill,mn-quarterspicker mn-fill + mn-fill {  margin-top: 2px;}mn-datetimepicker {  display: inline-block;  height: 28px;}mn-datetimepicker mn-dropdown {  border: 1px solid #d9d9d9;  border-radius: 2px;  height: 100%;}mn-datetimepicker mn-dropdown > div {  height: 100%;}mn-datetimepicker mn-dropdown mn-input {  border: 1px solid transparent;  height: 100%;  width: auto;  cursor: pointer;}mn-datetimepicker mn-dropdown mn-input span.mnc-next {  color: #ccc;  margin-right: -3px;  line-height: 23px;}mn-datetimepicker mn-dropdown mn-input i.mnc-next {  color: #666;  line-height: 25px;}mn-datetimepicker mn-dropdown mn-input input {  display: inline-block;  width: 100%;}mn-datetimeranges {  padding-right: 8px;}mn-datetimeranges mn-fill.mnc-header .mn-col-content {  padding-left: 8px;  height: 28px;  line-height: 28px;  border-bottom: 1px solid #d9d9d9;}mn-datetimeranges section {  display: none;}mn-datetimeranges section.active {  display: block;}mn-datetimeranges section li {  padding-left: 8px;  height: 28px;  line-height: 28px;  border-radius: 2px;}mn-datetimeranges section li:hover {  background: rgba(61, 168, 245, 0.3);  cursor: pointer;}mn-datetimeranges section li.selected {  background: #108ee9;  border-color: #0e77ca;  color: #fff;}mn-calendar .mnc-header {  height: 28px;  font-size: 15px;}mn-calendar .mnc-header .mnc-header-prev {  padding-left: 8px;  text-align: left;}mn-calendar .mnc-header .mnc-header-current {  text-align: center;}mn-calendar .mnc-header .mnc-header-next {  padding-right: 8px;  text-align: right;}mn-calendar .mnc-header i {  width: 16px;  text-align: center;  color: #999;  font-size: 16px;  transition: color 0.2s ease-in-out;}mn-calendar .mnc-header i:hover {  color: rgba(61, 168, 245, 0.8);}mn-calendar .mnc-header + mn-calendar-view {  margin-top: 8px;}mn-calendar-view {  display: block;  font-size: 15px;}mn-calendar-view .prev .mn-col-content {  color: #999;}mn-calendar-view .next .mn-col-content {  color: #999;}mn-calendar-view .b {  color: #666;  font-weight: 400;}mn-calendar-view .range:not(.next):not(.prev):not(.no-selected) .mn-col-content {  background: #e2f2fe;}mn-calendar-view .range-reverse:not(.next):not(.prev):not(.no-selected) .mn-col-content {  background: #fef2e2;}mn-calendar-view .mnc-header {  padding-bottom: 8px;  margin-bottom: 8px;  font-size: 14px;  border-bottom: 1px solid #e7ecf1;}mn-calendar-view .mnc-header + .mnc-items,mn-calendar-view .mnc-items + .mnc-items {  margin-top: 2px;}mn-calendar-view .mnc-header > mn-col .mn-col-content,mn-calendar-view .mnc-items > mn-col .mn-col-content {  height: 32px;  line-height: 32px;  text-align: center;}mn-calendar-view .mnc-header > mn-col.today,mn-calendar-view .mnc-items > mn-col.today {  color: #ed6b75;}mn-calendar-view .mnc-header > mn-col:not(.no-selected):not(.next):not(.prev):hover .mn-col-content,mn-calendar-view .mnc-items > mn-col:not(.no-selected):not(.next):not(.prev):hover .mn-col-content {  background: rgba(61, 168, 245, 0.4);  border-radius: 2px;  cursor: pointer;}mn-calendar-view .mnc-header > mn-col.selected .mn-col-content,mn-calendar-view .mnc-items > mn-col.selected .mn-col-content {  background: rgba(61, 168, 245, 0.6);  border-radius: 2px;}mn-calendar-view .mnc-header > mn-col.start .mn-col-content,mn-calendar-view .mnc-items > mn-col.start .mn-col-content {  background: rgba(61, 168, 245, 0.3);  border-radius: 2px;}mn-calendar-view .mnc-header > mn-col.end .mn-col-content,mn-calendar-view .mnc-items > mn-col.end .mn-col-content {  background: rgba(61, 168, 245, 0.5);  border-radius: 2px;}mn-calendar-view .mnc-header > mn-col.no-selected,mn-calendar-view .mnc-items > mn-col.no-selected {  cursor: not-allowed;}mn-calendar-view .mnc-header > mn-col.no-selected .mn-col-content,mn-calendar-view .mnc-items > mn-col.no-selected .mn-col-content {  color: #aaa;  text-decoration: line-through;}']
                },] },
    ];
    /** @nocollapse */
    MnDatetimePickerComponent.ctorParameters = function () { return []; };
    MnDatetimePickerComponent.propDecorators = {
        "mode": [{ type: core_1.Input, args: ['mnMode',] },],
        "startDate": [{ type: core_1.Input, args: ['mnStartDate',] },],
        "endDate": [{ type: core_1.Input, args: ['mnEndDate',] },],
        "minDate": [{ type: core_1.Input, args: ['mnMinDate',] },],
        "maxDate": [{ type: core_1.Input, args: ['mnMaxDate',] },],
        "views": [{ type: core_1.Input, args: ['mnViews',] },],
        "quicks": [{ type: core_1.Input, args: ['mnQuicks',] },],
        "result": [{ type: core_1.Output, args: ['mnResult',] },],
        "selected": [{ type: core_1.Output, args: ['mnSelected',] },],
    };
    return MnDatetimePickerComponent;
}());
exports.MnDatetimePickerComponent = MnDatetimePickerComponent;
//# sourceMappingURL=mn-datetime-picker.component.js.map