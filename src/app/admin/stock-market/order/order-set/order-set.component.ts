import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { StockSymbol } from '../../symbols/symbol.model';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { OrderRequest, OrderResponse } from '../order.model';
import { OrderService } from '../order.service';
import { delay, mergeMap, tap } from 'rxjs';
import { BalanceService } from '../../balance/balance.service';
import { Balance } from '../../balance/balance.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarShowComponent } from '../../shared/snack-bar-show.component';

@Component({
  selector: 'order-set',
  templateUrl: './order-set.component.html',
  styleUrls: ['./order-set.component.css'],
})
export class OrderSetComponent implements OnInit {
  balance = {} as Balance;
  totalAmount!: number;
  loading:boolean=false;

  constructor(
    private sharedService: SharedService,
    private orderService: OrderService,
    private balanceService: BalanceService,
    public fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  visible = true;
  orderResponse = {} as OrderResponse;
  orderForm!: FormGroup;
  symbolSelected = {} as StockSymbol;

  ngOnInit(): void {
    this.reactiveForm();
    //what symbol selected
    this.sharedService.selectSymbol.subscribe((response: StockSymbol) => {
      this.symbolSelected = response;
      this.getBalance();
    });
  }
  /* first get last Balance  */
  private getBalance() {
    this.balanceService.getBalance().subscribe((res) => {
      this.balance = res;
     // this.reactiveForm();
    });
  }

  /* Reactive form */
  reactiveForm() {
    this.orderForm = this.fb.group({
      count: [
        '',
        [
          Validators.required,
          Validators.min(1),
          (control: AbstractControl) =>
            Validators.max(
              Math.round(
                this.balance.credit /
                  this.symbolSelected?.priceInfo?.rangePrice?.max
              )
            )(control),
        ],
      ],
      price: [
        '',
        [
          Validators.required,
          (control: AbstractControl) =>
            Validators.min(this.symbolSelected?.priceInfo?.rangePrice?.min)(
              control
            ),

          (control: AbstractControl) =>
            Validators.max(this.symbolSelected?.priceInfo?.rangePrice?.max)(
              control
            ),
        ],
      ],
    });
  }

  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    return this.orderForm.controls[control].hasError(error);
  };
  submitForm() {
    debugger;
    //generate new request
    let orderModel: OrderRequest = {
      id: null,
      symbol: this.symbolSelected.name,
      count: this.orderForm.get('count')?.value,
      price: this.orderForm.get('price')?.value,
      date: new Date(new Date().getTime()),
    };
    //:)
    this.totalAmount = orderModel.count * orderModel.price;

    //validation
    if (this.totalAmount > this.balance.credit) {
      this._snackBar.openFromComponent(snackBarShowComponent, {
        duration: 3 * 1000,
        data: {
          html: '<h1>sorry </h1><p>your credit is not enough to buy</p>',
        },
      });
      return false;
    }
    this.loading=true;
    this.orderService
      .orderRegister(orderModel)
      .pipe(
        //TODO how to get response from core
        //! is it ok to inquiry Here?? ==> i dont think so! may be later just in order-result comp
        // mergeMap((e) => this.orderService.orderInquiry(this.orderResponse)),
        mergeMap((e) => this.balanceService.updateBalance(this.totalAmount))
        ,delay(1000)
      )
      .subscribe((x) => {
       // debugger;
        this.resetForm();
        this.addOrdersResult(orderModel);
        this.updateBalance(this.totalAmount);
        //todo: must omit below line in operation
        this.balance.credit=this.balance.credit-this.totalAmount

        this._snackBar.openFromComponent(snackBarShowComponent, {
          duration: 3 * 1000,
          data: {
            html: '<span class="example-pizza-party"> You Buy successfully :) ! 🍕 </span>',
          },
        });
        this.loading=false;
        return true;
      });
    return false;
  }

  private orderRegister(orderModel: OrderRequest) {
    this.orderService
      .orderRegister(orderModel)
      .pipe(tap((res) => console.log('HTTP response of submit order :', res)))
      .subscribe((res) => (this.orderResponse = res));
  }
  private resetForm(): void {
    this.orderForm.reset(this.orderForm.value);
  }
  private addOrdersResult(orderRequest: OrderRequest): void {
    this.orderService.orderResponseCaller.next(orderRequest);
  }
  private updateBalance(totalAmount:number): void {
    this.balanceService.changeBalanceCaller.next(totalAmount);
  }
}
