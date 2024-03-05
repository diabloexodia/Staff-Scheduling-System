import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapSchedulesComponent } from './swap-schedules.component';

describe('SwapSchedulesComponent', () => {
  let component: SwapSchedulesComponent;
  let fixture: ComponentFixture<SwapSchedulesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwapSchedulesComponent]
    });
    fixture = TestBed.createComponent(SwapSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
