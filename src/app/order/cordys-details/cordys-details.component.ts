import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OrderService } from '../order.service';
import { OrderDetail } from '../order.domain';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {CordysFunctionalProductStatus} from '../order.domain';

@Component({
  selector: 'cordys-details',
  templateUrl: './cordys-details.component.html',
  styleUrls: ['./cordys-details.component.css']
})
export class CordysDetailsComponent implements OnInit {

  @Input()
  order: OrderDetail;

  sniInputXml:string;

  errorMessage;

  @ViewChild('sniInputModal')
  modal: ModalComponent;

  constructor(private _orderService: OrderService) {
  }

  ngOnInit() {
    this.getOrder();
  }


  getOrder() {
    this._orderService.getOpenOrderByHateosLink(this.order).subscribe(order => {
      this.order = order;
    },
      error => {
        console.error("Error in getCordysFunctionalProducts call " + error);
        this.errorMessage = error;
      }, () => (this.order.isCordysDetailsLoaded = true));
  }

  showSNIInputXml(sniInputXml: string) {
  //  console.log(sniInputXml);
    this.sniInputXml = sniInputXml;    
    this.modal.open();
  }
  getOrderStatusCssForCordysFunctionalProducts(status :string) {
//let orderStatus:any =this.order.cordysOrderDetails.cordysOrderStatus;
    switch (status) {
      case CordysFunctionalProductStatus.SNI_PROVISIONED: return 'success'
      case CordysFunctionalProductStatus.CANCELLED_CRM: return 'success'
      case CordysFunctionalProductStatus.SNI_CANCELLED: return 'success'
      case CordysFunctionalProductStatus.CANCELLED_CRM_AFPROV: return 'success'
      case CordysFunctionalProductStatus.SNI_CANCELLED_BY_COM: return 'success'
      case CordysFunctionalProductStatus.CANCELLED_CRM_DUPROV: return 'success'
      case CordysFunctionalProductStatus.PORT_ANS_RECD: return 'success'
      case CordysFunctionalProductStatus.PLN_RECD: return 'success'
      case CordysFunctionalProductStatus.SNI_IN_PROC: return 'success'
      case CordysFunctionalProductStatus.PLN_COMPLETE: return 'success'

      case CordysFunctionalProductStatus.NOT_REQUESTED: return 'amber'
      case CordysFunctionalProductStatus.RETRY_SENT: return 'amber'
      case CordysFunctionalProductStatus.INITIAL: return 'success'
      case CordysFunctionalProductStatus.SENT_TO_SNI: return 'amber'
      case CordysFunctionalProductStatus.WAIT_PORTING_SYNC: return 'amber'
      case CordysFunctionalProductStatus.COM_IN_PROC: return 'amber'
      case CordysFunctionalProductStatus.PORTING_SYNC: return 'amber'

      case CordysFunctionalProductStatus.COM_ERROR: return 'danger'
      case CordysFunctionalProductStatus.SNI_REJECT: return 'danger'
      case CordysFunctionalProductStatus.SNI_ERROR: return 'danger'
      case CordysFunctionalProductStatus.SNI_TIMEOUT: return 'danger'
      case CordysFunctionalProductStatus.TECH_ERROR:return 'danger'
    }

  }
 }