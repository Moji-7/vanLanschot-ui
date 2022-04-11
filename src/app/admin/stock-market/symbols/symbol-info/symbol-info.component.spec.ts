import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolInfoComponent } from './symbol-info.component';

describe('SymbolInfoComponent', () => {
  let component: SymbolInfoComponent;
  let fixture: ComponentFixture<SymbolInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymbolInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
