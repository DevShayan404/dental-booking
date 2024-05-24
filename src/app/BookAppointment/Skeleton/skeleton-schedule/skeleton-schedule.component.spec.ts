import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonScheduleComponent } from './skeleton-schedule.component';

describe('SkeletonScheduleComponent', () => {
  let component: SkeletonScheduleComponent;
  let fixture: ComponentFixture<SkeletonScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
