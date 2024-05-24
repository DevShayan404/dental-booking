import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollDivComponent } from './scroll-div.component';

describe('ScrollDivComponent', () => {
  let component: ScrollDivComponent;
  let fixture: ComponentFixture<ScrollDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollDivComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
