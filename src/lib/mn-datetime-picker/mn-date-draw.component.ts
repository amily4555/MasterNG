import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MnDate} from './mn-date.class';

declare const mu: any;

/**
 * 构建日期视图
 */

@Component({
    selector: 'mn-datedraw',
    template: `
        <section>
            <mn-fill [gutter]="2" *ngFor="let rows of _frames">
                <mn-col [span]="1" *ngFor="let col of rows">
                    <mn-datesingle [mnDs]="col" [mnView]="_view"></mn-datesingle>
                </mn-col>
            </mn-fill>
        </section>
    `
})
export class MnDateDrawComponent implements OnInit {

    $date: any = {};
    date$: any = new BehaviorSubject<any>({});

    @Input() _maxDate: any;
    @Input() _minDate: any;

    @Input('mnYear')
    set year_(y) {
        this.$date.y = y;
        this.date$.next(this.$date);
    }

    @Input('mnMonth')
    set month_(m) {
        this.$date.m = m - 1;
        this.date$.next(this.$date);
    }

    @Input('mnDay')
    set day_(d) {
        this.$date.d = d;
        this.date$.next(this.$date);
    }

    @Input('mnDate')
    set date_(dt) {

    }

    @Input('mnView') _view: string;

    _frames: any;

    dmap: any = {
        y: 'setFullYear',
        m: 'setMonth',
        d: 'setDate'
    };

    constructor() {
        this.date$.subscribe((d) => {
            this.bounce(d);
        });
    }

    ngOnInit() {
        this._frames = this.buildFrame();
    }

    newdate() {
        return new Date(1970, 0, 1, 0, 0, 0, 0);
    }

    bounce: any = mu.debounce((ds: any) => {
        let date = this.newdate();
        mu.each(ds, (v, f) => {
            date[this.dmap[f]](v);
        });

        let pools = this.datePools(date, ds);
        this.fill(pools);
    }, 300);

    /**
     * 根据不同的视图，创建时间集合架子
     */
    buildFrame(): void {

        switch (this._view) {

            // 年视图
            // 5 年视图
            // row 5 col 4
            case 'years':
                return mu.map(10, (i) => {
                    return new Array(5);
                }, []);


            // 季度视图
            // 5 年视图
            // row 5 col 4
            case 'quarters':
                return mu.map(4, (i) => {
                    return new Array(1);
                }, []);


            // 月视图
            // row 4 col 3
            case 'months':
                return mu.map(4, (i) => {
                    return new Array(3);
                }, []);

            // 周视图
            // 当年周数
            // row 7 col 8
            case 'weeks':
                return mu.map(7, (i) => {
                    return new Array(8);
                }, []);

            // 日视图
            case 'days':
                return mu.map(6, (i) => {
                    return new Array(7);
                }, []);
        }
    }

    /**
     * 当前日历数据集
     * @return {any}
     */
    datePools(date, ds): any {

        let mndate = new MnDate(date);

        let _pools = [];

        switch (this._view) {

            // 年视图
            // 5 年视图
            // row 5 col 4
            case 'years':
                let year = mndate.months.year;
                let startYear = Math.floor(year / 50) * 50;
                mu.each(50, (i) => {
                    _pools.push({
                        d: 1,
                        m: 0,
                        y: startYear + i
                    });
                });

                return _pools;

            // 季度视图
            // 5 年视图
            // row 5 col 4
            case 'quarters':
                mu.each(4, (i) => {
                    _pools.push({
                        d: 1,
                        m: (i - 1) * 3 + 1,
                        y: mndate.months.year
                    });
                });

                return _pools;


            // 月视图
            // row 4 col 3
            case 'months':
                mu.each(12, (i) => {
                    _pools.push({
                        d: 1,
                        m: i,
                        y: mndate.months.year
                    });
                });

                return _pools;

            // 周视图
            // 当年周数
            // row 7 col 8
            case 'weeks':
                return mu.map(7, (i) => {
                    return new Array(8);
                }, []);

            // 日视图
            case 'days':

                let ct = mndate['months'];
                let pre = mndate.mom(-1);
                let next = mndate.mom(1);

                // pre month
                mu.each(pre.endWeekday, (i, ii) => {
                    _pools.unshift({
                        d: pre.days - ii,
                        m: pre.month,
                        y: pre.year
                    });
                });

                // current month
                mu.each(ct.days, (i) => {
                    _pools.push({
                        d: i,
                        m: ct.month,
                        y: ct.year
                    });
                });

                mu.each(42 - _pools.length, (i) => {
                    _pools.push({
                        d: i,
                        m: next.month,
                        y: next.year
                    });
                });

                return _pools;
        }
    }

    fill(pools) {
        let _cols = this._frames[0].length;

        mu.each(pools, (dt, ii) => {
            let row = Math.floor(ii / _cols);
            let col = ii % _cols;
            this._frames[row][col] = dt;
        });

        console.log(this._frames);
    }

}

