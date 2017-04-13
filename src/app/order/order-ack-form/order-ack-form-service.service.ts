import { Injectable,EventEmitter } from '@angular/core';
import { OrderDetail } from '../order.domain';
@Injectable()
export class OrderAckFormServiceService {
submitEvent: EventEmitter<OrderDetail>;
  constructor() { 
this.submitEvent = new EventEmitter<OrderDetail>();

  }
  onSubmitted(enteredInput : OrderDetail)
    {
        this.submitEvent.emit(enteredInput);
        //console.log('Search Input Entered ' + enteredInput);  
    }

}

