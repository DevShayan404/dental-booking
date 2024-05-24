import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterDetailsComponent } from './enter-details.component';

describe('EnterDetailsComponent', () => {
  let component: EnterDetailsComponent;
  let fixture: ComponentFixture<EnterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
