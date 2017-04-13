import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOrder'
})
export class FilterOrderPipe implements PipeTransform {

  transform(orders: any, args?: any): any {

    return (args ?
         orders.filter((order) => order.crmOrderId.toUpperCase().includes(args.toUpperCase())) :
         orders);
  }
  //TODO Move to shared within order.

}
