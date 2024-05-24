import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonDrListComponent } from './skeleton-dr-list.component';

describe('SkeletonDrListComponent', () => {
  let component: SkeletonDrListComponent;
  let fixture: ComponentFixture<SkeletonDrListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonDrListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonDrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
