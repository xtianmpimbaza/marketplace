import { TestBed, inject } from '@angular/core/testing';

import { AddrequestService } from './addrequest.service';

describe('AddrequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddrequestService]
    });
  });

  it('should be created', inject([AddrequestService], (service: AddrequestService) => {
    expect(service).toBeTruthy();
  }));
});
