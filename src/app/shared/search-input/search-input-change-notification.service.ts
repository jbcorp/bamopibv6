import { Injectable, EventEmitter } from '@angular/core';
import {SearchOrder} from '../search-order.domain';

@Injectable()
export class SearchInputNotificationService {
    searchInputEvent: EventEmitter<string>;
    searchOrderEvent: EventEmitter<SearchOrder>;
    constructor() {
        this.searchInputEvent = new EventEmitter<string>();
        this.searchOrderEvent = new EventEmitter<SearchOrder>();
    }

    searchInputEntered(enteredInput : string)
    {
        this.searchInputEvent.emit(enteredInput);
        //console.log('Search Input Entered ' + enteredInput);  
    }

    
    searchOrder(searchOrder : SearchOrder)
    {
        debugger;
        this.searchOrderEvent.emit(searchOrder);
    }

}