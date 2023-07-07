import { TestBed } from '@angular/core/testing';

import { VidoeService } from './vidoe.service';

describe('VidoeService', () => {
  let service: VidoeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VidoeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
