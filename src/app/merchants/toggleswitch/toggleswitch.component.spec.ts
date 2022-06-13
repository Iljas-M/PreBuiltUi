import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleswitchComponent } from './toggleswitch.component';

describe('ToggleswitchComponent', () => {
  let component: ToggleswitchComponent;
  let fixture: ComponentFixture<ToggleswitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleswitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleswitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
