import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { of } from 'rxjs';
import { OrderResponse, Order, Request } from '../order.model';
import { OrderService } from '../order.service';

import { OrderResultComponent } from './order-result.component';
import { DebugElement } from '@angular/core';

describe('OrderResultComponent', () => {
  let component: OrderResultComponent;
  let fixture: ComponentFixture<OrderResultComponent>;
  let orderService: OrderService;
  let orderService2: OrderService;
  let order = {} as Order;
  let ordersToInquiry = [] as Order[];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [OrderResultComponent],
      providers: [OrderService],
    }).compileComponents();
    orderService = TestBed.inject(OrderService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  beforeEach(() => {
    order = {
      request: {
        id: 1,
        symbol: 'aapl',
        count: 2,
        price: 44,
        date: new Date(new Date().getTime()),
        traceId: 66151,
      },
      responses: [
        {
          date: new Date(new Date().getTime()),
          statuscode: 0,
          traceId: 66151,
          id:66151
        },
      ],
    };
    orderService2 = fixture.debugElement.injector.get(OrderService);
    orderService2.orderResponseCaller.pipe().subscribe((order: Order) => {
      ordersToInquiry.push(order);
    });
    orderService2.orderResponseCaller.next(order);
  });

  it('should add to inquury queue', () => {
    //add new response 110
    ordersToInquiry
      .find((x) => x.request.traceId == 66151)
      ?.responses.push({
        date: new Date(new Date().getTime()),
        statuscode: 110,
        traceId: 66151,
          id:66151
      });
    // test on component
    expect(
      component.ordersToInquiry
        .find((x) => x.request.traceId == 66151)
        ?.responses.slice(-1)[0].statuscode
    ).toEqual(110);
    //
    fixture.detectChanges();
    const bannerDe: DebugElement = fixture.debugElement;
    var paragraphDe = bannerDe.query(By.css('.order-inQueue'));
    var p: HTMLElement = paragraphDe.nativeElement;
    expect(p.textContent).toContain('color');

    //test
    //call inquiry
component.ordersInquiry(order);
    ///////
    //add new response 151
    ordersToInquiry
      .find((x) => x.request.traceId == 66151)
      ?.responses.push({
        date: new Date(new Date().getTime()),
        statuscode: 220,
        traceId: 66151,
          id:66151
      });
    //check if has success color
    fixture.detectChanges();
    //const bannerDe: DebugElement = fixture.debugElement;
    paragraphDe = bannerDe.query(By.css('.order-success'));
    p: HTMLElement = paragraphDe.nativeElement;
    expect(p.textContent).toContain('color');
    // check last state
    const lastState = bannerDe.query(By.css('.laststate'));
    const elem2: HTMLElement = lastState.nativeElement;
    expect(elem2.textContent).toContain(
      order.responses.slice(-1)[0].statuscode
    );
  });
});
