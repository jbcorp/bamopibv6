/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrderAckFormServiceService } from './order-ack-form-service.service';

describe('Service: OrderAckFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderAckFormServiceService]
    });
  });

  it('should ...', inject([OrderAckFormServiceService], (service: OrderAckFormServiceService) => {
    expect(service).toBeTruthy();
  }));
});
