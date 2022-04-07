import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSetComponent } from './order-set.component';

describe('OrderSetComponent', () => {
  let component: OrderSetComponent;
  let fixture: ComponentFixture<OrderSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
