import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVidoeComponent } from './new-vidoe.component';

describe('NewVidoeComponent', () => {
  let component: NewVidoeComponent;
  let fixture: ComponentFixture<NewVidoeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewVidoeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewVidoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
