import { TestBed, inject } from '@angular/core/testing';

import { EntityrefreshService } from './entityrefresh.service';

describe('EntityrefreshService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntityrefreshService]
    });
  });

  it('should be created', inject([EntityrefreshService], (service: EntityrefreshService) => {
    expect(service).toBeTruthy();
  }));
});
