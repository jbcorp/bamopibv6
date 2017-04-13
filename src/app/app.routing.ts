import { Router, RouterModule } from '@angular/router';

import {OpenOrdersComponent} from './order/open-orders/open-orders.component';
import {CorrectedOrdersComponent} from './order/corrected-orders/corrected-orders.component';
//import { ChainAvailabilityComponent} from './monitoring/chain-availability/chain-availability.component';
import { HeatMapComponent} from './monitoring/chain-availability/heat-map/heat-map.component';
import {OrderDetailComponent} from './order/order-detail/order-detail.component';
export const routing = RouterModule.forRoot([
  { path: 'orders', component: OpenOrdersComponent },
  { path: 'corrections', component: CorrectedOrdersComponent },
  { path: 'availability', component: HeatMapComponent },
  { path: 'orders/:id', component: OrderDetailComponent },
  { path: 'AM', component: OpenOrdersComponent },
  { path: '**', redirectTo: '/orders' }
    
])
