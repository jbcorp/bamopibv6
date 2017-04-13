import { HeatMapComponent } from './chain-availability/heat-map';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
    imports: [CommonModule],
    exports: [HeatMapComponent],
    declarations: [HeatMapComponent],
    providers: []

})

export class MonitoringModule { }
