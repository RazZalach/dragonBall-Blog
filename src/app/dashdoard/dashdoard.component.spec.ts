import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashdoardComponent } from './dashdoard.component';

describe('DashdoardComponent', () => {
  let component: DashdoardComponent;
  let fixture: ComponentFixture<DashdoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashdoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashdoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
