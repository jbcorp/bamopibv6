import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {HeatMap} from '../module/heat-map';
import {Observable } from 'rxjs/Observable';
import 'rxjs/Rx'


@Injectable()
export class HeatMapService {
 http:any;
 heatMapList:HeatMap[];
 //To switch the call from HTTP or Mock
 
  constructor(private _http: Http){
       this.http = _http;      
   }

getHeatMapData(): Observable<HeatMap[]> {

   return this.http.get("http://slnc7r1071.app.gen.local:443/bam/api/heatMap/HeatMapDetails")
 .map(response => <HeatMap[]> response.json())
      .catch((error:any) => ( Observable.throw(error.json().error || 'Server error'))); 
 
}


}
