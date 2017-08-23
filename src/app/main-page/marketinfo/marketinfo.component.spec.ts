import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketinfoComponent } from './marketinfo.component';

describe('MarketinfoComponent', () => {
  let component: MarketinfoComponent;
  let fixture: ComponentFixture<MarketinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
