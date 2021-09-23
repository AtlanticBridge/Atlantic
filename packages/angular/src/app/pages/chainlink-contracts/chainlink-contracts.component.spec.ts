import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainlinkContractsComponent } from './chainlink-contracts.component';

describe('ChainlinkContractsComponent', () => {
  let component: ChainlinkContractsComponent;
  let fixture: ComponentFixture<ChainlinkContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChainlinkContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainlinkContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
