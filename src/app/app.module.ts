import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { OrderModule } from './order/order.module';
import {MonitoringModule} from './monitoring/monitoring.module';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';



@NgModule({
  declarations: [
    AppComponent,                
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    SharedModule,
    OrderModule,
    MonitoringModule,
    Ng2Bs3ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
