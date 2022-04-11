import { Component } from '@angular/core';
import { childRoutes } from './child-routes';
import {of} from 'rxjs'
import {map,filter} from 'rxjs/operators'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  routes = childRoutes;


 }
