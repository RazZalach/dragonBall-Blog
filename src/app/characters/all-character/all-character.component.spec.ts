import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCharacterComponent } from './all-character.component';

describe('AllCharacterComponent', () => {
  let component: AllCharacterComponent;
  let fixture: ComponentFixture<AllCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCharacterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
