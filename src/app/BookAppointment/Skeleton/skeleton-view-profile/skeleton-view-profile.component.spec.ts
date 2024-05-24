import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonViewProfileComponent } from './skeleton-view-profile.component';

describe('SkeletonViewProfileComponent', () => {
  let component: SkeletonViewProfileComponent;
  let fixture: ComponentFixture<SkeletonViewProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonViewProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
