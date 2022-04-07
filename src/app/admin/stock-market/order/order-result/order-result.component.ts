import { Component, OnInit } from '@angular/core';
import { pipe, tap } from 'rxjs';
import { StockSymbol } from '../../symbols/symbol.model';
import { OrderRequest, OrderResponse } from '../order.model';
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
  ordersToInquiry: OrderRequest[] = [] as OrderRequest[];
  orderResponse = {} as OrderResponse;
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    //add  to result component (requests who send to core successfully)
    this.orderService.orderResponseCaller
      .pipe()
      .subscribe((response: OrderRequest) => {
        debugger;
        this.ordersToInquiry.push(response);
      });
  }

  // this.ordersToInquiry.call(ordersInquiry).pop

  private ordersInquiry(orderResponse: OrderResponse) {
    this.orderService
      .orderInquiry(orderResponse)
      .pipe(tap((res) => console.log('inquiry result  of  order :', res)))
      .subscribe((res) => (this.orderResponse = res));
  }
}
