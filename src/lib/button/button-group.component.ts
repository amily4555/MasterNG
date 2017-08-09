import {Component, OnInit, Input, HostBinding, OnChanges, SimpleChanges} from '@angular/core';
import * as mu from 'mzmu';
declare var mu: any;

@Component({
    selector: 'btn-group',
    template: `
        <ng-content></ng-content>            
    `
})
export class ButtonGroupComponent implements OnInit, OnChanges {

    @Input() type: string;

    constructor() {

    }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges): void {

    }

}