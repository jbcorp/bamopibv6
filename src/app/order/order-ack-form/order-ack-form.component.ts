import { Component, OnInit, Output,Input } from '@angular/core';
import { OrderDetail } from '../order.domain';
import { OrderService } from '../order.service';
import { FormGroup, FormControl, FormBuilder, Validators, } from '@angular/forms';
import {OrderAckFormServiceService} from './order-ack-form-service.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { DropDownSystem } from '../order.domain';
import { Corrections } from '../order.domain';
import {EventEmitter} from '@angular/core';

//import { ROUTER_DIRECTIVES } from '@angular/router';
@Component({
  selector: 'app-order-ack-form',
  templateUrl: './order-ack-form.component.html',
  styleUrls: ['./order-ack-form.component.css'],
})
export class OrderAckFormComponent implements OnInit {

@Input()
  isAckAccessible;
  @Input()
  isClicked;
  constructor(fb: FormBuilder, private orderService: OrderService,private orderAckService:OrderAckFormServiceService) {
   
  let ctrl = new FormControl({value: '', disabled: false});
  
    this.orderAckForm = fb.group({
      
                    eta: [{value: '', disabled:!ctrl.status}, Validators.required], 
                    workaround: [{value: '', disabled:!ctrl.status}],
                    comment: [{value: '', disabled:ctrl.status}],
                    selectedSystem:[]});
  }

  @Input()
  order: OrderDetail;

  @Input()
  modal: ModalComponent;  
  myOrderList:OrderDetail[];
 //@Output() notify = new EventEmitter<boolean>();

  orderAckForm: FormGroup;
 correction: Corrections = new Corrections();
 //@Output() onSelected = new EventEmitter<OrderDetail>();
  //Dropdown
  DropDownSystem = DropDownSystem;

  selectedSystem : string= DropDownSystem.System;
  systems = [DropDownSystem.FUSION, DropDownSystem.CORDYS, DropDownSystem.SIEBEL];
  
  isLoading: boolean;
  errorMessage: string = '';
  successMessage: string = '';
  isEtaSaved: boolean;

  ngOnInit() {
  console.log('Dropdownlist1 is  :');
  console.log(this.isAckAccessible);



this.order = {
  
      id: 0, createdAt: 0,
      createdBy: '',
      updatedAt: 0,
      updatedBy: '',
      siebelOrderId: '',
      siebelOrderNumber: '',
      orderType: '',
      siebelCreationDate:null,
      siebelOrderDetails: { siebelStatus: '' },
      fusionOrderDetails: { fusionStatus: '' },
      cordysOrderDetails: {},
      corrections: {
        siebelAcknowledged: false,
        cordysAcknowledged: false,
        fusionAcknowledged: false,
        siebelCorrected: false,
        cordysCorrected: false,
        fusionCorrected: false,
        eta: '',
        workaround: '',
        comment: '',
        correctionTime: null,
        changed: false
      }
  }

 
console.log('Dropdownlist2 is   :');
//this.selectedSystem = this.getSelectedSystemForAck();
    //Handle undefined correction object
    
   if ('undefined' === typeof this.order.corrections || this.order.corrections === null) {
      this.order.corrections = this.correction;
      this.isEtaSaved = false;
      console.log('Dropdownlist3 is   :');
    }
  
    //Handle display based on backend data
    else if (this.order.corrections) {
      //Disable ETA input as ETA is already present in backend
      if (this.order.corrections.eta) {

        this.isEtaSaved = true; 
      }
    
    //this.selectedSystem = this.getSelectedSystemForAck(); //set dropdown value based on backend flag
   
   
       
    } 
  }
 

  if(isClicked){
    //this.onAckChecked();
    
    console.log(this.selectedSystem,"From backend");
     this.selectedSystem = this.getSelectedSystemForAck();
     console.log(this.selectedSystem,"From backend");
  }
  onAckChecked(): void {




    this.setAckForSelectedSystem(this.selectedSystem);
  }

  onSubmit() {
   // console.log('onSubmit' + this.order);
    let tempCorrections = this.order.corrections;
   // console.log(this.order.siebelCreationDate+'sieble date2')
   // console.log("On save " + tempCorrections.eta + tempCorrections.workaround);

    
    //Set Ack flag to true based on selected dropdown system
    this.setAckForSelectedSystem(this.selectedSystem);
    tempCorrections.changed = true;

    this.order.corrections = tempCorrections; //Values are pass by ref, but added for readability
    //Call backend service
    //TODO check for submission date
   
    this.orderService.updateOrder(this.order).subscribe(
      response => {
       // console.log('Order Updated' + response);
           let orderUpdated:OrderDetail =response;
         
           this.successMessage = "Data saved successfully"
       //    console.log(orderUpdated);
           this.orderAckService.onSubmitted(orderUpdated);
           

      },
      error => {
        console.error("Error in saving Corrections comments: " + error);
      },
      () => { console.log('Updating order'); }
    );

    if (this.modal) {
      this.modal.close();
     /* let tempCorrections = this.order.corrections;
    //ToDo - do for all 3 systems
    tempCorrections.cordysAcknowledged = null;
    
    if (!this.isEtaSaved) {
      tempCorrections.eta = null;
    }
    tempCorrections.workaround = null;
    tempCorrections.comment = null;
    this.order.corrections = tempCorrections; */ //Values are pass by ref, but added for readability */
    }

  }

//Based on the flag from backend, Identify the system
  getSelectedSystemForAck(): string {
    //default
    // console.log('getselected system');
    let systemSetInBackend = this.DropDownSystem.SIEBEL;
    let tempCorrections = this.order.corrections;
    //Check which Ack flag is true
  //  console.log(tempCorrections.cordysAcknowledged,'Cordys')
 //  console.log(tempCorrections.fusionAcknowledged,'Fusion')
//  console.log(tempCorrections.siebelAcknowledged,'Sieble')
    switch(true) {
      case tempCorrections.cordysAcknowledged: 
          systemSetInBackend = this.DropDownSystem.CORDYS;
          break;
      case tempCorrections.fusionAcknowledged: 
          systemSetInBackend = this.DropDownSystem.FUSION;
          break;
      case tempCorrections.siebelAcknowledged: 
          systemSetInBackend = this.DropDownSystem.SIEBEL;
          break; 
    }
    return systemSetInBackend;
  }

 

//Set Ack flag to true based on selected dropdown system
  setAckForSelectedSystem(selectedSystem: string): void {

   
    let tempCorrections = this.order.corrections;
    switch(selectedSystem) {
      case this.DropDownSystem.CORDYS: 
          tempCorrections.cordysAcknowledged = true;
          break;
      case this.DropDownSystem.FUSION: 
          tempCorrections.fusionAcknowledged = true;
          console.log('inside fusion');
          break;
      case this.DropDownSystem.SIEBEL: 
          tempCorrections.siebelAcknowledged = true;
          break; 
    }
    this.order.corrections = tempCorrections;
  }
    //To play with date, this conversion function is important
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

    updateSelectedValue(event:string): void
    {
      
      console.log(event,'Select Event');
      this.selectedSystem = event;
       console.log(this.selectedSystem);
  }


}