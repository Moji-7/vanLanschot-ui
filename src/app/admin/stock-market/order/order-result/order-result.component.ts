import { Component, OnInit } from '@angular/core';
import { delay, pipe, tap } from 'rxjs';
import { StockSymbol } from '../../symbols/symbol.model';

import { OrderService } from '../order.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,
  // ...
} from '@angular/animations';
import { Order, OrderResponse } from '../order.model';
@Component({
  selector: 'order-result',
  templateUrl: './order-result.component.html',
  styleUrls: ['./order-result.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '100ms',
              animate(
                '500ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            ),
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [
            style({ opacity: 1 }),
            stagger(
              '100ms',
              animate(
                '500ms ease-out',
                style({ opacity: 0, transform: 'translateY(-15px)' })
              )
            ),
          ],
          {
            optional: true,
          }
        ),
      ]),
    ]),
  ],
})
export class OrderResultComponent implements OnInit {
  ordersToInquiry: Order[] = [] as Order[];
  orderResponse = {} as OrderResponse;
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    //add  to result component (requests who send to core successfully)
    this.orderService.orderResponseCaller
      .pipe()
      .subscribe((response: Order) => {
        debugger;
        this.ordersToInquiry.push(response);
        tap(delay(1000));
        //now must inquiry result
        //!
        //todo must comment below line just for test
        this.ordersInquiry(response);
      });
  }

  // this.ordersToInquiry.call(ordersInquiry).pop

  setClass = (response: OrderResponse) => {
    switch (response.statuscode) {
      case 0:
        return 'order-send';
        break;
      case 110:
        return 'order-inQueue';
        break;
      case 220:
        return 'order-success';
        break;
      case 230:
        return 'order-fail';
        break;
      default:
        return 'order-unknown';
    }
  };

  public ordersInquiry(order: Order) {
    this.orderService
      .orderInquiry(order)
      .pipe(tap((res) => console.log('inquiry result  of  order :', res)))
      .subscribe((res:any) => {
        this.orderResponse = res[0].orderResponse;
        this.ordersToInquiry
          .find((x) => x.request.traceId == order.request.traceId)
          ?.responses.push(this.orderResponse);
      });
  }
}
