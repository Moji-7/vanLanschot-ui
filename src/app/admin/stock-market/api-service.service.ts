//src/app/data.services.ts

import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable({
  providedIn: 'root',
})
export class ApiService implements InMemoryDbService {
  constructor() {}
  createDb() {
    return {

      balance:
        {
          credit: 2400.00,
         locked: 400.00,
          profit: +1250.00,
        },

    };
  }
}
