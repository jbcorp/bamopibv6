import { Injectable, EventEmitter} from '@angular/core'
import { Http, Response,Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { OrderDetail } from './order.domain';
import { environment } from '../../environments/environment';


@Injectable()
export class OrderService {
    selectedOrderEvent:EventEmitter<OrderDetail>;
    constructor(private _http: Http) {
        this.selectedOrderEvent = new EventEmitter<OrderDetail>(); 
     }

    private _openOrders: OrderDetail[];
    private _orderServiceUrl = environment.orderServiceURL;
    private _correctedOrderServiceUrl = environment.correctedOrderServiceURL;

    getOpenOrders(): Observable<OrderDetail[]> {
        var headers = new Headers({});
        var options = new RequestOptions({ headers: headers });
        return this._http.get(this._orderServiceUrl, options).map(data => data.json());;
    }


    getOpenOrderBySiebelId(orderId: string): Observable<OrderDetail> {
        var headers = new Headers({});
        var options = new RequestOptions({ headers: headers });
        return this._http.get(this._orderServiceUrl + "/" + orderId, options).map(data => data.json());;
    }


    getOpenOrderByHateosLink(order: OrderDetail): Observable<OrderDetail> {
       
        var url;
        var headers = new Headers({});
        var options = new RequestOptions({ headers: headers });

        url = order.links.find(link => link.rel == "self").url;
        if (url) {
            return this._http.get(url, options).map(data => data.json());;
        }
    }

    getCorrectedOrders(): Observable<OrderDetail[]> {
        var headers = new Headers({});
        var options = new RequestOptions({ headers: headers });
        return this._http.get(this._correctedOrderServiceUrl, options).map(data => data.json());
    }



    updateOrder(order: OrderDetail): Observable<OrderDetail> {
        let url = this.getLinkForSelf(order);
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option
        let orderJson = JSON.stringify(order);
        if (url) {
            return this._http.put(url, orderJson, options).map(data => data.json())
          /* .map((res:Response) => {
                    let order: OrderDetail = res.json();
                    let resultDate: Date;
                    //ToDo - refactor convertToDate method
                    resultDate = this.convertToDate([order.corrections.correctionTime])[0];
                    return resultDate;
                })  */
                .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
        }
            
    }
 syncOrder():Observable<OrderDetail[]>{

let url = 'http://slnc7r1071.app.gen.local:443/bam/api/process/bam-sync-process';
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option
        //let orderJson = JSON.stringify(order);
        if (url) {
            return this._http.post(url, options).map(res => res.json())
         
                .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
        }

     }   
    getLinkForSelf(objectWithLink: any): string {

        let url: string;

        if (objectWithLink.links) {
            for (var i = 0; i < objectWithLink.links.length; i++) {
                if (objectWithLink.links[i].rel === 'self') {
                    url = objectWithLink.links[i].url;
                    break;
                }
            }
        }
        return url;
    }
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


    getSelectedOrder(selectedOrder:OrderDetail ){
        console.log(selectedOrder);
        this.selectedOrderEvent.emit(selectedOrder);
    }

}