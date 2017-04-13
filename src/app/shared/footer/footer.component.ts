import { Component, OnInit } from '@angular/core';
import{ OrderService} from '../../order/order.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  syncDate:any=null;
constructor(private orderService: OrderService) {

    
  }
  

  ngOnInit() {
    this.isAcknowledgeAccessible;
  }
syncMethod(){
  
this.orderService.syncOrder().subscribe(response => {
     
        //location.reload();
        //console.log('Sync started' + response);
      },
      error => {
        console.error("Error in saving Corrections comments: " + error);
      },
      () => { }
    );

}
//Check the url, if it contains AM support keyword, give the access to checkbox
  public isAcknowledgeAccessible(): boolean {
    let isAckAccessible: boolean = false;
//console.log(window.location.href);
    if (window.location.href.includes("AM")) {
      isAckAccessible = true;
    }

    return isAckAccessible;
  }
}
