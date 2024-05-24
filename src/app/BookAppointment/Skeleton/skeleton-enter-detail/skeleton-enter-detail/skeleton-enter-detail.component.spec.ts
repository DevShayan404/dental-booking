import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonEnterDetailComponent } from './skeleton-enter-detail.component';

describe('SkeletonEnterDetailComponent', () => {
  let component: SkeletonEnterDetailComponent;
  let fixture: ComponentFixture<SkeletonEnterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonEnterDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonEnterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
