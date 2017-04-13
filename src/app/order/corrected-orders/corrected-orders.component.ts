import { Component, OnInit } from '@angular/core';
import { OrderDetail } from '../order.domain';
import { OrderService } from '../order.service';
import { SearchInputNotificationService } from '../../shared/search-input/search-input-change-notification.service';
import { FilterOrderPipe } from '../filter-order.pipe/';
import { OrderAckFormComponent } from '../order-ack-form/order-ack-form.component';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-corrected-orders',
  templateUrl: './corrected-orders.component.html',
  styleUrls: ['./corrected-orders.component.css']
})
export class CorrectedOrdersComponent implements OnInit {

correctedOrdersList: OrderDetail[];
filteredCorrectedOrdersList: OrderDetail[];
searchTermEntered: string;
isLoading = true;

  constructor(private orderService: OrderService,
    private _searchInputNotificationService: SearchInputNotificationService) {
  }

  ngOnInit() {
      this._searchInputNotificationService.searchInputEvent.subscribe(data => {
      this.searchTermEntered = data;
      this.filterOrders();
    });
    this.orderService.getCorrectedOrders().subscribe((orders) => {
       this.correctedOrdersList = orders;
       this.filteredCorrectedOrdersList = this.correctedOrdersList;
       this.isLoading = false;
      });  
   
  }

 
  filterOrders() {    
    this.filteredCorrectedOrdersList = [];
   // console.log(this.searchTermEntered);
    if (this.searchTermEntered.trim() == '') {
      this.filteredCorrectedOrdersList = this.correctedOrdersList;
      return;
    }
    this.filteredCorrectedOrdersList = this.correctedOrdersList.filter
      (order => order.siebelOrderId.toUpperCase().includes(this.searchTermEntered.toUpperCase()));
  }

toggleShowCordysDetails(order:OrderDetail)
  {
      order.showCordysDetails = !order.showCordysDetails;
  }
  

}