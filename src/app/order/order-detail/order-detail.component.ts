import { Component, OnInit,ViewChild } from '@angular/core';
import {OrderService}  from '../order.service';
import { OrderDetail,FunctionalProduct } from '../order.domain';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location }  from '@angular/common';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order:OrderDetail;
  page:number;
  visible:boolean=false;
  filteredOpenOrdersList: OrderDetail[];
  @ViewChild('sniDetailInputModal')
  modal: ModalComponent;
  selectedFunctionalProductStatus:string;
   sniInputXml:string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,private orderService:OrderService) {}

functionalProductStatus = [
    {value: '', viewValue: '--Select--'},
    {value: 'SNI_PROVISIONED', viewValue: 'SNI_PROVISIONED'},
    {value: 'CANCELLED_CRM', viewValue: 'CANCELLED_CRM'},
    {value: 'SNI_CANCELLED', viewValue: 'SNI_CANCELLED'},
    {value: 'CANCELLED_CRM_AFPROV', viewValue: 'CANCELLED_CRM_AFPROV'},
    {value: 'SNI_CANCELLED_BY_COM', viewValue: 'SNI_CANCELLED_BY_COM'},
    {value: 'CANCELLED_CRM_DUPROV', viewValue: 'CANCELLED_CRM_DUPROV'},
    {value: 'COM_ERROR', viewValue: 'COM_ERROR'},
    {value: 'SNI_REJECT', viewValue: 'SNI_REJECT'},
    {value: 'SNI_ERROR', viewValue: 'SNI_ERROR'},
    {value: 'SNI_TIMEOUT', viewValue: 'SNI_TIMEOUT'},
    {value: 'TECH_ERROR', viewValue: 'TECH_ERROR'},
    {value: 'OPEN', viewValue: 'OPEN'},
    {value: 'PRE_SUBMISSION', viewValue: 'PRE_SUBMISSION'},
    {value: 'NOT_REQUESTED', viewValue: 'NOT_REQUESTED'},
    {value: 'RETRY_SENT', viewValue: 'RETRY_SENT'},
    {value: 'WAIT_PORTING_SYNC', viewValue: 'WAIT_PORTING_SYNC'},
    {value: 'INITIAL', viewValue: 'INITIAL'},
    {value: 'SENT_TO_SNI', viewValue: 'SENT_TO_SNI'},
    {value: 'PORT_ANS_RECD', viewValue: 'PORT_ANS_RECD'},
    {value: 'SNI_IN_PROC', viewValue: 'SNI_IN_PROC'},
    {value: 'PLN_RECD', viewValue: 'PLN_RECD'},
    {value: 'COM_IN_PROC', viewValue: 'COM_IN_PROC'},
    {value: 'PORTING_SYNC', viewValue: 'PORTING_SYNC'},
    {value: 'PLN_COMPLETE', viewValue: 'PLN_COMPLETE'}
  ];


  ngOnInit() {
     this.route.params
      .switchMap((params: Params) => this.orderService.getOpenOrderBySiebelId(params['id']))
      .subscribe(data => {console.log(data); this.order = data; console.log(this.order);});
      console.log('Outside Order ' + this.order);
  }
  showSNIInputXml(sniInputXml: string) {
  //  console.log(sniInputXml);
    this.sniInputXml = sniInputXml;    
    this.modal.open();
  }

  onChange(fp:FunctionalProduct){
    console.log(fp);
    console.log(this.page);
    fp.isChecked=true;
    this.selectedFunctionalProductStatus=fp.functionalProductStatus;
    console.log(this.selectedFunctionalProductStatus);
    console.log(fp.functionalProductStatus);
  }
  
updateFunctionalProduct(fp:FunctionalProduct){
  console.log(this.selectedFunctionalProductStatus);
  fp.isChecked=false;
  fp.functionalProductStatus=this.selectedFunctionalProductStatus;
  /*(this.orderService.updateOrder(this.order).subscribe(data=>{
    console.log(data)
  }
  );*/
}

cancelFunctionalProduct(fp:FunctionalProduct){
  console.log(this.selectedFunctionalProductStatus);
  fp.isChecked=false;
}

retrigger(){
  this.visible=true;
  setTimeout(()=>this.visible=false, 5000);
  
}


}
