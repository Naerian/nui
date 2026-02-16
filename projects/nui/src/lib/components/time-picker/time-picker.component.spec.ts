import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimePickerComponent } from './time-picker.component';

describe('TimePickerComponent', () => {
  let component: TimePickerComponent;
  let fixture: ComponentFixture<TimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default mode HOUR_MINUTE_24', () => {
    expect(component.mode).toBe('HOUR_MINUTE_24');
  });

  it('should parse time string correctly', () => {
    component.writeValue('14:30');
    const time = component.selectedTime();
    expect(time?.hour).toBe(14);
    expect(time?.minute).toBe(30);
  });

  it('should convert to Date correctly', () => {
    component.writeValue({ hour: 14, minute: 30 });
    const date = component.toDate();
    expect(date.getHours()).toBe(14);
    expect(date.getMinutes()).toBe(30);
  });

  it('should handle 12-hour format with AM/PM', () => {
    component.mode = 'HOUR_MINUTE_12';
    component.writeValue({ hour: 2, minute: 30, period: 'PM' });
    const date = component.toDate();
    expect(date.getHours()).toBe(14); // 2 PM = 14:00
  });
});
