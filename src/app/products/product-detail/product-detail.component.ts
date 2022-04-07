import { AbstractEmitterVisitor } from '@angular/compiler/src/output/abstract_emitter';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, MaxValidator } from '@angular/forms';
import { Location } from '@angular/common';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {
  count,
  filter,
  map,
  max,
  Observable,
  reduce,
  switchMap,
  take,
} from 'rxjs';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  id?: number | null;
  products?: Product[] | null;
  filter$!: Observable<Product[]>;

  // for form
  checkoutForm = this.formBuilder.group({
    name: '',
    address: '',
  });
  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.filter$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.id = Number(params.get('id'));
        return this.productService.getProducts().pipe(
          map((res) => res.filter((proj) => proj.id === this.id))

          //     map((res) => res.reduce((cur,prev) => (cur.id > prev.id)?cur:prev))
        );
      })
    );
    // First get the product id from the current route.
  }
  onSubmit(): void {
    var maxId = () => {
      let maxId: number = 0;
      this.productService
        .getProducts()
        .pipe(
          map((res) =>
            res.reduce((cur, prev) => (cur.id > prev.id ? cur : prev))
          )
          //(map(r=>(r.map(dd=>dd.id))))
        )
        .subscribe((resp) => {
          this.id = resp.id;
        });
      debugger;



      return maxId;
    };
    let newProduct: Product = {
      id: maxId() + 1,
      name: this.checkoutForm.get('name')?.value,
    };
    console.log('new product', newProduct);
    // Process checkout data here
    this.productService
      .createProduct(newProduct)
      .subscribe((res) => console.log('res', res));
    // console.warn('Your order has been submitted', this.checkoutForm.value);
    this.filter$ = this.productService.getProducts();
    //  this._location.back();
    this.checkoutForm.reset();
  }
}
