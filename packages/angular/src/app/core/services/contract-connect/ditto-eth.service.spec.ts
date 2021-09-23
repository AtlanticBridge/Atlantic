import { TestBed } from '@angular/core/testing';

import { DittoEthService } from './ditto-eth.service';

describe('DittoEthService', () => {
  let service: DittoEthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DittoEthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
