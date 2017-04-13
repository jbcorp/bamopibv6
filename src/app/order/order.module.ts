import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule} from '@angular/forms'; 
import { SharedModule } from '../shared/shared.module';
import { OpenOrdersComponent } from './open-orders/open-orders.component';
import {CordysDetailsComponent} from './cordys-details/cordys-details.component';
import { OrderAckFormComponent } from './order-ack-form/order-ack-form.component';
import {OrderAckFormServiceService} from './order-ack-form/order-ack-form-service.service';
import { OrderService } from './order.service';
import { CorrectedOrdersComponent } from './corrected-orders/corrected-orders.component';
import { FilterOrderPipe } from './filter-order.pipe';
import {DataTableModule} from "angular2-datatable";
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { MaterialModule , MdInputModule} from '@angular/material';
import 'hammerjs';
@NgModule({
    imports: [CommonModule,DataTableModule,SharedModule,
    Ng2Bs3ModalModule,FormsModule,ReactiveFormsModule,MaterialModule , MdInputModule],
    exports: [OpenOrdersComponent,CorrectedOrdersComponent,OrderDetailComponent],
    declarations: [OpenOrdersComponent, CorrectedOrdersComponent, FilterOrderPipe , CordysDetailsComponent,
    OrderAckFormComponent,
    OrderDetailComponent],
    providers: [OrderService,OrderAckFormServiceService]

})

export class OrderModule { }
