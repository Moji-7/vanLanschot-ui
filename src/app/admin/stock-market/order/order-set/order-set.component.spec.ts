import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OrderSetComponent } from './order-set.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedService } from '../../shared.service';
import { OrderService } from '../order.service';
import { BalanceService } from '../../balance/balance.service';

import { StockSymbol } from '../../symbols/symbol.model';
import { PriceInfo, SymbolState } from '../../common.model';
import { Balance } from '../../balance/balance.model';
import { of } from 'rxjs';
import { Order } from '../order.model';

describe('OrderSetComponent', () => {
  let component: OrderSetComponent;
  let fixture: ComponentFixture<OrderSetComponent>;

  let httpClientSpy: jasmine.SpyObj<HttpClient>;
 // let orderService: OrderService;

  let balanceService: BalanceService;
  //let valueServiceSpy: jasmine.SpyObj<BalanceService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatTooltipModule,
      ],
     providers: [BalanceService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [OrderSetComponent],
    }).compileComponents();
   balanceService = TestBed.inject(BalanceService);
   //  orderService = TestBed.inject(OrderService);
   // httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  // balanceService2 = new BalanceService(httpClientSpy);

   // valueServiceSpy = TestBed.inject(
  //    BalanceService
  //  ) as jasmine.SpyObj<BalanceService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSetComponent);
    component = fixture.componentInstance;

   // const orderService = fixture.debugElement.injector.get(OrderService);
  //  const balanceService = fixture.debugElement.injector.get(BalanceService);
    fixture.detectChanges();
  });

  it('should createeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', () => {
    let priceInfo: PriceInfo = {
      id: 1,
      openPrice: 0,
      lastPrice: { price: 0, change: 0 },
      currentPrice: { price: 0, change: 0 },
      rangePrice: { max: 0, min: 0 },
    };
    let selectedSymbol: StockSymbol = {
      id: 1,
      name: 'AAPL',
      state: SymbolState.Open,
      description: 'Apple Inc',
      icon: '/assets/images/aapl.png',
      Group: 2,
      priceInfo: priceInfo,
    };

    const sharedService = fixture.debugElement.injector.get(SharedService);
    sharedService.selectSymbol.next(selectedSymbol);

    //call from seleted
   expect(component.symbolSelected.id).toEqual(selectedSymbol.id);
    /////////////////////////////////////////////////////////////////////////////////////////////




    //get balance
    let balance = {} as Balance;
    let balancefake: Balance = {
      id: 1,
      credit: 2400.0,
      locked: 400.0,
      profit: '+1250.00',
    };
    //stub service
    balanceService.getBalance = () => of(balancefake);
    //get data
     balanceService.getBalance().subscribe((res) => {
       balance = res;
     });
  expect(balance.credit).toEqual(2400);

    //2

    //expect(balanceService2.getBalance())
    //  .withContext('service returned stub value')
    //  .toBe(of(balancefake));

    //3
    //const mock=sinon.mock(balanceService)
    //mock.expects('getBalance').once();
    // mock.verify();

   // httpClientSpy.get.and.returnValue(of(balancefake));
    //get data
  //  balanceService2.getBalance().subscribe((res) => {
   //   balance = res;
   // });
   // expect(balance.credit).toEqual(2400);



    // expect(balanceService2.getBalance()).toEqual(of(balancefake));

    // expect(component).toBeTruthy();
  });
  it('should createeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', () => {

	  let ordersToInquiry: Order[] = [] as Order[];
	component.orderForm.setValue({
      "count": 2,
      "price": 44
    });

    expect(component.orderForm.valid).toEqual(true);

	component.submitForm()
	expect(component.totalAmount).toEqual(88);

	expect(component.orderModel.request.count).toEqual(2)


	//component.addOrdersResult( component.orderModel);


	 const orderService2 = fixture.debugElement.injector.get(OrderService);


	  orderService2.orderResponseCaller
      .pipe()
      .subscribe((response:Order) => {

        ordersToInquiry.push(response);
      });

	  orderService2.orderResponseCaller.next(component.orderModel);
	 // t.push(1)
	expect((ordersToInquiry).length).toEqual(1)

  });
});
