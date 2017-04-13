/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { HeatMapService } from './heat-map.service';

describe('Service: HeatMap', () => {
  beforeEach(() => {
    addProviders([HeatMapService]);
  });

  it('should ...',
    inject([HeatMapService],
      (service: HeatMapService) => {
        expect(service).toBeTruthy();
      }));
});
