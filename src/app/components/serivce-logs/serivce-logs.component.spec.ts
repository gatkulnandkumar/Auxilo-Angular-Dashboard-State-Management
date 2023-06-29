import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerivceLogsComponent } from './serivce-logs.component';

describe('SerivceLogsComponent', () => {
  let component: SerivceLogsComponent;
  let fixture: ComponentFixture<SerivceLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerivceLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SerivceLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
