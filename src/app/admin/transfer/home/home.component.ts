import { Component, OnInit } from '@angular/core';
export interface TabItem {
  label: string;
  icon: string;
  route: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tabs: TabItem[] = [
    {
      label: 'new transfer',
      icon: 'home',
      route: 'register',
    },
    {
      label: 'register transfer',
      icon: 'person',
      route: 'sign',
    },
    {
      label: 'veiw transfers',
      icon: 'search',
      route: 'history',
    },
    {
      label: 'veiw transactions',
      icon: 'search',
      route: 'history',
    },
  ];

  constructor() { }

  ngOnInit(): void {

  }

}
