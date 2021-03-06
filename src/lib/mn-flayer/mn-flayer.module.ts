import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MnDropdownComponent} from './mn-dropdown.component';
import {MnDropdownContentComponent} from './mn-dropdown-content.component';
import {MnLayerDirective} from './mn-layer.directive';
import {MnLayerContainerService} from './mn-layer-container.service';
import {MnCommonModule} from '../mn-common/mn-common.module';
import {MnFormModule} from '../mn-form/mn-form.module';
import {MnTooltipComponent} from './mn-tooltip.component';
import {MnModalComponent} from './mn-modal.component';
import {MnModalServices} from './mn-modal.services';
import {MnLayerComponent} from './mn-layer.component';
import {MnPanelModule} from '../mn-panel/mn-panel.module';
import {MnLayoutModule} from '../mn-layout/mn-layout.module';
import {MnDynamicModule} from '../mn-dynamic/mn-dynamic.module';
import {MnNotifyComponent} from './mn-notify.component';
import {MnAlertModule} from '../mn-alert/mn-alert.module';

@NgModule({
    imports: [
        CommonModule,
        MnCommonModule,
        MnFormModule,
        MnPanelModule,
        MnLayoutModule,
        MnDynamicModule,
        MnAlertModule
    ],
    declarations: [
        MnDropdownComponent,
        MnDropdownContentComponent,
        MnTooltipComponent,
        MnLayerDirective,
        MnModalComponent,
        MnLayerComponent,
        MnNotifyComponent
    ],
    exports: [
        MnDropdownComponent,
        MnDropdownContentComponent,
        MnTooltipComponent,
        MnLayerDirective,
        MnModalComponent,
        MnLayerComponent,
        MnNotifyComponent
    ],

    entryComponents: [
        MnModalComponent,
        MnLayerComponent,
        MnNotifyComponent
    ],

    providers: [
        MnLayerContainerService,
        MnModalServices
    ]
})
export class MnFloatLayerModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MnFloatLayerModule
        };
    }
}
