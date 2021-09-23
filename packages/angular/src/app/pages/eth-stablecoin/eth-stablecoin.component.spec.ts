import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EthStablecoinComponent } from './eth-stablecoin.component';

describe('EthStablecoinComponent', () => {
  let component: EthStablecoinComponent;
  let fixture: ComponentFixture<EthStablecoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EthStablecoinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EthStablecoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
