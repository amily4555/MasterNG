import {
    Component, OnInit, Input, ElementRef, Renderer2, OnChanges, SimpleChanges, Optional, Host, HostBinding, ViewEncapsulation
} from '@angular/core';
import {MnRowComponent} from './mn-row.component';

declare const mu: any;

@Component({
    selector: 'mn-col',
    template: `
        <section class="mn-col-content mnc-content">
            <ng-content></ng-content>
        </section>
    `,
    encapsulation: ViewEncapsulation.None
})
export class MnColComponent implements OnInit, OnChanges {

    @Input() span: number = 0;
    @Input() order: number = 0;

    @HostBinding('style.padding-left.px')
    get paddingLeft() {
        return this._rowCmp && this._rowCmp.gutter / 2;
    }

    @HostBinding('style.padding-right.px')
    get paddingRight() {
        return this._rowCmp && this._rowCmp.gutter / 2;
    }

    // todo padding
    constructor(@Optional() @Host() private _rowCmp: MnRowComponent,
                private _ref: ElementRef,
                private _renderer: Renderer2) {
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        mu.run(changes['span'], () => {
            this._renderer.addClass(this._ref.nativeElement, 'col-' + this.span);
        });

        mu.run(changes['order'], () => {
            this._renderer.setStyle(this._ref.nativeElement, 'order', this.order);
        });

    }
}
