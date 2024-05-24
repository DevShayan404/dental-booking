import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonSlotsComponent } from './skeleton-slots.component';

describe('SkeletonSlotsComponent', () => {
  let component: SkeletonSlotsComponent;
  let fixture: ComponentFixture<SkeletonSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonSlotsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
