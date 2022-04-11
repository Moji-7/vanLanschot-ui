import { Component, OnInit } from '@angular/core';
export interface TabItem {
  label: string;
  icon: string;
  route: string;
}
@Component({
  selector: 'app-stock',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class StockHomeComponent implements OnInit {

  tabs: TabItem[] = [
    {
      label: 'order',
      icon: 'home',
      route: 'order',
    },
    {
      label: 'portfolio',
      icon: 'person',
      route: 'portfolio',
    },

  ];

  constructor() { }

  ngOnInit(): void {

  }

}
