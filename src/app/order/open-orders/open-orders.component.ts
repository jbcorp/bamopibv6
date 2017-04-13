import { Component, OnInit ,ViewChild,OnChanges,ViewContainerRef } from '@angular/core';
import { OrderService } from '../order.service';
import { OrderDetail } from '../order.domain';
import { SearchInputNotificationService } from '../../shared/search-input/search-input-change-notification.service';
import { FilterOrderPipe } from '../filter-order.pipe';
import { OrderAckFormComponent } from '../order-ack-form/order-ack-form.component';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {LocationStrategy, PlatformLocation, Location} from '@angular/common';
import {OrderAckFormServiceService} from '../order-ack-form/order-ack-form-service.service';
import {SearchOrder} from '../../shared/search-order.domain';
import { Router, ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-open-orders',
  templateUrl: './open-orders.component.html',
  styleUrls: ['./open-orders.component.css'],

})
export class OpenOrdersComponent implements OnInit {

  openOrdersList: OrderDetail[];
  filteredOpenOrdersList: OrderDetail[];
  searchTermEntered: string;
  isLoading = true;
  selectedOrderForAck:OrderDetail;
  responseOnSubmit:OrderDetail;
  isAckAccessible: boolean;
  isClicked:boolean=false;
  searchOrder:SearchOrder;

  
  @ViewChild('ackFormPlaceholderModal')
  modal: ModalComponent;

  constructor(private orderService: OrderService,
    private _searchInputNotificationService: SearchInputNotificationService,
    locationStrategy: LocationStrategy,
    private _orderAckService: OrderAckFormServiceService, private router: Router) {
  }

  ngOnInit() {
      debugger;
      this._searchInputNotificationService.searchInputEvent.subscribe(data => {
      this.searchTermEntered = data;
      this.filterOrders();
    });

      this._searchInputNotificationService.searchOrderEvent.subscribe(data => {
      this.searchOrder = data;
      this.orderSearch();
    });


      this._orderAckService.submitEvent.subscribe(items =>{
      this.responseOnSubmit = items;
 console.log(this.responseOnSubmit);
      let status:boolean =this.isAcknowledged(this.responseOnSubmit);
      console.log(status,'Acknowledge');
      this.updateOrderInList(this.responseOnSubmit);
});
    this.isAckAccessible = this.isAcknowledgeAccessible();

    this.orderService.getOpenOrders().subscribe((orders) => {
     
       this.openOrdersList = orders;
       
      this.openOrdersList.forEach(item =>{
 if (typeof item.siebelCreationDate === 'string') {
                    item.siebelCreationDate = new Date(item.siebelCreationDate.toString());
                   
                }
                else if (typeof item.siebelCreationDate === 'number') {
                    item.siebelCreationDate = new Date(item.siebelCreationDate);
                }
                return item;
            }
     
    );

   
       this.filteredOpenOrdersList = this.openOrdersList;
       
       this.isLoading = false;
      });  
   
  }


  updateOrderInList(responseOnSubmit)
  {
     
     this.openOrdersList.forEach(order => {
      
      if(order.siebelOrderId === responseOnSubmit.siebelOrderId )
      {
        console.log('Updating order ');
        order.corrections.siebelAcknowledged = true;
      }
    });
  }

  filterOrders() {    
    this.filteredOpenOrdersList = [];
    console.log(this.searchTermEntered);
    if (this.searchTermEntered.trim() == '') {
      this.filteredOpenOrdersList = this.openOrdersList;
      return;
    }
    this.filteredOpenOrdersList = this.openOrdersList.filter
      (order => order.siebelOrderId.toUpperCase().includes(this.searchTermEntered.toUpperCase()));
  }

  toggleShowCordysDetails(order:OrderDetail)
  {
      order.showCordysDetails = !order.showCordysDetails;
  }
  
  isAcknowledged(order1:OrderDetail): boolean
  {
    //console.log('checked acknowledge');
    //console.log(order1.corrections.cordysAcknowledged);
    return ( order1.corrections.cordysAcknowledged 
            || order1.corrections.siebelAcknowledged 
            || order1.corrections.fusionAcknowledged 
            || order1.corrections.siebelCorrected
            || order1.corrections.fusionCorrected
            || order1.corrections.cordysCorrected);  
  } 

  /*isAcknowledged(order:OrderDetail,state:boolean): boolean{
   
       order.corrections.changed =state;
       return order.corrections.changed;
} */

  showAcknowledgementForm(order:OrderDetail)
  {
    console.log(order); 
  this.isClicked=this.isCheckboxClicked()
  console.log(this.isClicked,'Clicked');
    this.getOrder(order);   
    //let status :boolean=this.isAcknowledgeAccessible();
    console.log(status,'isAckAccessible');
    this.modal.open();
    

    
  }

    getOrder(order:OrderDetail) {
    this.orderService.getOpenOrderByHateosLink(order).subscribe(response => {
        
    this.selectedOrderForAck = response;
    console.log(response);
    });
  }


//filter by order refined SearchInputNotificationService
orderSearch() {    
    this.filteredOpenOrdersList = [];
    this.filteredOpenOrdersList = this.openOrdersList;

  


    
    //filter by Fusion Status
    if ("" != this.searchOrder.selectedFusionStatus && null != this.searchOrder.selectedFusionStatus) {
      this.filteredOpenOrdersList = this.filteredOpenOrdersList
        .filter
        (order =>
          null != order.fusionOrderDetails
          && null != order.fusionOrderDetails.fusionStatus
          && order.fusionOrderDetails.fusionStatus
            .toUpperCase().includes(this.searchOrder.selectedFusionStatus.toUpperCase()))
    }
    //filter by Siebel Status
    if ("" != this.searchOrder.selectedSiebelStatus && null != this.searchOrder.selectedSiebelStatus) {
      this.filteredOpenOrdersList = this.filteredOpenOrdersList.filter(order => null != order.siebelOrderDetails
        && null != order.siebelOrderDetails.siebelStatus
        && order.siebelOrderDetails.siebelStatus
          .toUpperCase().includes(this.searchOrder.selectedSiebelStatus.toUpperCase()))
    }

    //filter by Cordys Status
    if ("" != this.searchOrder.selectedCordysStatus && null != this.searchOrder.selectedCordysStatus) {
      this.filteredOpenOrdersList = this.filteredOpenOrdersList.filter(order => null != order.cordysOrderDetails
        && null != order.cordysOrderDetails.cordysStatus
        && order.cordysOrderDetails.cordysStatus
          .toUpperCase().includes(this.searchOrder.selectedCordysStatus.toUpperCase()))
    }

     //filter by Siebel-Id
    if (null != this.searchOrder.siebelId && "" != this.searchOrder.siebelId) {
        debugger;
        this.filteredOpenOrdersList = this.filteredOpenOrdersList.filter(order =>
        order.siebelOrderId.toUpperCase().includes(this.searchOrder.siebelId.toUpperCase()));
    }

     //filter by comorder id
    if (null != this.searchOrder.coId && "" != this.searchOrder.coId) {
        this.filteredOpenOrdersList = this.filteredOpenOrdersList.filter(order =>
            order.cordysOrderDetails != null && order.cordysOrderDetails.comOrderId != null &&
            this.searchOrder.coId.toUpperCase().includes(order.cordysOrderDetails.comOrderId.toUpperCase()));
    }


   
  }
//Check the url, if it contains AM support keyword, give the access to checkbox
 convertToDate(list: any[]): any[] {
        list.map(item =>
            {
                if (typeof item.siebelCreationDate === 'string') {
                    item.siebelCreationDate = new Date(item.siebelCreationDate.toString());
                }
                else if (typeof item.siebelCreationDate === 'number') {
                    item.siebelCreationDate = new Date(item.siebelCreationDate);
                }
                return item;
            }
        );
        return list;
    }
 //routing to specific order
 onSelect(order: OrderDetail) {
   //this.router.navigate(['/order', order.siebelOrderId]);
   this.router.navigate(['/orders', order.siebelOrderId]);
   this.orderService.getSelectedOrder(order);
 }







//Check the url, if it contains AM support keyword, give the access to checkbox
  public isAcknowledgeAccessible(): boolean {
    let isAckAccessible: boolean = false;
    console.log(window.location.href);
    if (window.location.href.includes("AM")) {
      isAckAccessible = true;
    }

    return isAckAccessible;
  }
  public isCheckboxClicked(): boolean {
    this.isClicked = true;
    return this.isClicked;
  }
}
