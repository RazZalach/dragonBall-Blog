import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVidoesComponent } from './all-vidoes.component';

describe('AllVidoesComponent', () => {
  let component: AllVidoesComponent;
  let fixture: ComponentFixture<AllVidoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllVidoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllVidoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
