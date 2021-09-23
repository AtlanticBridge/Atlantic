import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EthFaucetComponent } from './eth-faucet.component';

describe('EthFaucetComponent', () => {
  let component: EthFaucetComponent;
  let fixture: ComponentFixture<EthFaucetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EthFaucetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EthFaucetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
