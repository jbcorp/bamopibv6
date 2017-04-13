import { Component, OnInit, Output, EventEmitter,ViewChild,NgModule} from '@angular/core';
import {SearchInputNotificationService} from './search-input-change-notification.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {SearchOrder} from '../search-order.domain';
import { Router, ActivatedRoute, Params } from '@angular/router'


@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
  
})
export class SearchInputComponent implements OnInit {
  
searched:boolean;

siebelId:string;
  constructor(private searchInputNotificationService : SearchInputNotificationService,private router: Router) { 
  }



  
  searchOrderModel=new SearchOrder();
 
 fusionStatus = [
    {value: '', viewValue: '--Select--'},
    {value: 'NEW', viewValue: 'NEW'},
    {value: 'IN_PROGRESS', viewValue: 'IN_PROGRESS'},
    {value: 'ERROR', viewValue: 'ERROR'},
    {value: 'SUBMITTED', viewValue: 'SUBMITTED'},
    {value: 'COMPLETE', viewValue: 'COMPLETE'}
  ]; 
  cordysStatus = [
    {value: '', viewValue: '--Select--'},
    {value: 'CANCEL_COMPLETE', viewValue: 'CANCEL_COMPLETE'},
    {value: 'CRM_CLOSED', viewValue: 'CRM_CLOSED'},
    {value: 'COMPLETE', viewValue: 'COMPLETE'},
    {value: 'CANCEL_IN_PROCESS', viewValue: 'CANCEL_IN_PROCESS'},
    {value: 'IP_ADD_TRIGGER_RECD', viewValue: 'IP_ADD_TRIGGER_RECD'},
    {value: 'COM_REJECTED', viewValue: 'COM_REJECTED'},
    {value: 'IP_ADD_TRIGGER_WAIT', viewValue: 'IP_ADD_TRIGGER_WAIT'},
    {value: 'IN_PROCESS', viewValue: 'IN_PROCESS'},
    {value: 'COMPLETED', viewValue: 'COMPLETED'},
    {value: 'INITIAL', viewValue: 'INITIAL'}
  ];
 
  siebelStatus = [
    {value: '', viewValue: '--Select--'},
    {value: 'VERIFIED', viewValue: 'VERIFIED'},
    {value: 'FINAL', viewValue: 'FINAL'},
    {value: 'COMPLETE', viewValue: 'COMPLETE'},
    {value: 'ON_HOLD', viewValue: 'ON_HOLD'},
    {value: 'CANCELLED', viewValue: 'CANCELLED'},
    {value: 'PENDING', viewValue: 'PENDING'},
    {value: 'SUBMITTED', viewValue: 'SUBMITTED'},
    {value: 'PROVISIONING', viewValue: 'PROVISIONING'},
    {value: 'OTHER_SYSTEM', viewValue: 'OTHER_SYSTEM'},
    {value: 'ABANDONED', viewValue: 'ABANDONED'},
    {value: 'REQUESTED', viewValue: 'REQUESTED'},
    {value: 'OPEN', viewValue: 'OPEN'},
    {value: 'PRE_SUBMISSION', viewValue: 'PRE_SUBMISSION'},
  ];


  
  ngOnInit() {
    //  this.searchInput.emit('')
    //TODO Emit event on min three characters input
    this.searchOrderModel=new SearchOrder();
    this.searchOrderModel.selectedFusionStatus='';
    this.searchOrderModel.selectedCordysStatus='';
    this.searchOrderModel.selectedSiebelStatus='';
    this.searched=false;
  }
 @ViewChild('searchModal')
  modal: ModalComponent;


showSearchForm(){
  console.log('Opening Modal');
   this.modal.open();
   console.log('Modal is now open'+this.modal);
   console.log(this.modal);
}

search(){
   console.log(this.searchOrderModel);
 this.searchInputNotificationService.searchOrder(this.searchOrderModel);
this.modal.close();
debugger;
if (null != this.searchOrderModel.coId
  || null != this.searchOrderModel.siebelId
  || ("" != this.searchOrderModel.selectedCordysStatus&&null != this.searchOrderModel.selectedCordysStatus)
  || ("" != this.searchOrderModel.selectedFusionStatus&&null != this.searchOrderModel.selectedFusionStatus)
  || ("" != this.searchOrderModel.selectedSiebelStatus&&null != this.searchOrderModel.selectedSiebelStatus)) {
  this.searched = true;
} else {
  this.searched = false;
}
}


filterList(){
 
}
closeSearch(){
  this.modal.close();
  this.searchOrderModel = new SearchOrder();
  this.searchOrderModel.selectedFusionStatus='';
  this.searchOrderModel.selectedCordysStatus='';
  this.searchOrderModel.selectedSiebelStatus='';
}

resetAll(){
  //this.searchOrderModel=new SearchOrder();
  this.searchOrderModel.selectedFusionStatus='';
  this.searchOrderModel.selectedCordysStatus='';
  this.searchOrderModel.selectedSiebelStatus='';
}
  emitEvent($event) {
    this.searchInputNotificationService.searchInputEntered($event.target.value);
  }

}

