import { Component, OnInit } from '@angular/core';
import { Balance } from './balance.model';
import { BalanceService } from './balance.service';

@Component({
  selector: 'stock-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
})
export class BalanceComponent implements OnInit {
  balance = {} as Balance;
  constructor(private balanceService: BalanceService) {}

  ngOnInit(): void {
    this.getBalance();
    this.readyBalancedChanged();
  }
  private getBalance() {
    this.balanceService.getBalance().subscribe((res) => (this.balance = res));
  }
  private updateBalance(totalAmount: number) {
    this.balanceService
      .updateBalance(this.balance.credit-totalAmount)
      .subscribe((res) => (this.balance = res))

  }

  private readyBalancedChanged() {

    this.balanceService.changeBalanceCaller
      .pipe()
      .subscribe((totalAmount: number) => {
         debugger;
        this.updateBalance(totalAmount);
        this.getBalance();
        //!must remove below
        //tod: must remove below
        this.balance.credit=this.balance.credit-totalAmount;
      });
  }
  //  private setBalance() {
  //   ngOnInit(): void {
  //     //add response to inquiry registered successfully
  //     this.orderService.orderResponseCaller
  //       .pipe()
  //       .subscribe((response: OrderResponse) => {
  //         this.ordersToInquiry.push(response);
  //       });
  //   }
  //  }
}
