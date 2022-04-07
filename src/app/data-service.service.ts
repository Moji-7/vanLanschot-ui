//src/app/data.services.ts

import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable({
  providedIn: 'root',
})
export class DataService implements InMemoryDbService {
  constructor() {}
  createDb() {
    return {
      balance: [{
        id:1,
        credit: 2400.00,
        locked: 400.00,
        profit: +1250.00,
        date:'2020-04-13T18:25:43.511Z'
      }],
      orderRequest:[{
        id:1,
        symbolName:name,
        count:2,
        price:110,
        date:'2020-04-11T18:25:43.511Z'

      },
      {
        id:2,
        symbolName:name,
        count:77,
        price:440

      }],
      chartData: [
        {
         // data: {
            symbolName: 'AAPL',
            lineChartData: {
              data: [65, 59, 80, 81, 56, 55, 40],
              label: 'price',
              fill: true,
              backgroundColor: 'rgba(148,159,177,0.2)',
              borderColor: 'rgba(148,159,177,1)',
              pointBackgroundColor: 'rgba(148,159,177,1)',
              pointBorderColor: '#0088ff',
              pointHoverBackgroundColor: '#0088ff',
              pointHoverBorderColor: 'rgba(148,159,177,0.8)',
              tension: 0.3,
            },
         // },
        },
        {
         // data: {
            symbolName: 'MSFT',
            lineChartData: {
              data: [28, 48, 40, 19, 86, 27, 90],
              label: 'price',
              fill: true,
              backgroundColor: 'rgba(77,83,96,0.2)',
              borderColor: 'rgba(77,83,96,1)',
              pointBackgroundColor: 'rgba(77,83,96,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(77,83,96,1)',
              tension: 0.3,
            },
          //},
        },
        {
         // data: {
            symbolName: 'ORCL',
            lineChartData: {
              data: [18, 48, 77, 9, 100, 27, 40],
              label: 'price',
              fill: true,
              backgroundColor: 'rgba(148,159,177,0.2)',
              borderColor: 'rgba(148,159,177,1)',
              pointBackgroundColor: 'rgba(148,159,177,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(148,159,177,0.8)',
              tension: 0.3,
            },
         // },
        },
        {
         // data: {
            symbolName: 'IBM',
            lineChartData: {
              data: [18, 28, 40, 79, 16, 47, 66],
              label: 'price',
              fill: true,
              backgroundColor: 'rgba(77,83,96,0.2)',
              borderColor: 'rgba(77,83,96,1)',
              pointBackgroundColor: 'rgba(77,83,96,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(77,83,96,1)',
              tension: 0.3,
            },
         // },
        },
      ],


    };
  }
}
