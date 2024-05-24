import { TestBed } from '@angular/core/testing';

import { BookAppointmentServiceService } from './book-appointment-service.service';

describe('BookAppointmentServiceService', () => {
  let service: BookAppointmentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookAppointmentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
