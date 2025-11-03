import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TooltipComponent } from './tooltip.component';

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have role="tooltip"', () => {
    fixture.componentRef.setInput('content', 'Test tooltip');
    fixture.detectChanges();
    
    const element = fixture.nativeElement as HTMLElement;
    expect(element.getAttribute('role')).toBe('tooltip');
  });

  it('should display text content', () => {
    fixture.componentRef.setInput('content', 'Test content');
    component.isTemplate.set(false);
    fixture.detectChanges();

    const content = fixture.nativeElement.querySelector('.nui-tooltip__content');
    expect(content?.textContent?.trim()).toBe('Test content');
  });

  it('should show arrow by default', () => {
    fixture.componentRef.setInput('content', 'Test');
    fixture.componentRef.setInput('showArrow', true);
    fixture.detectChanges();

    const arrow = fixture.nativeElement.querySelector('.nui-tooltip__arrow');
    expect(arrow).toBeTruthy();
  });

  it('should hide arrow when showArrow is false', () => {
    fixture.componentRef.setInput('content', 'Test');
    fixture.componentRef.setInput('showArrow', false);
    fixture.detectChanges();

    const arrow = fixture.nativeElement.querySelector('.nui-tooltip__arrow');
    expect(arrow).toBeFalsy();
  });

  it('should set data-position attribute', () => {
    fixture.componentRef.setInput('content', 'Test');
    fixture.componentRef.setInput('position', 'bottom');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.getAttribute('data-position')).toBe('bottom');
  });

  it('should set id attribute for accessibility', () => {
    const testId = 'tooltip-123';
    fixture.componentRef.setInput('content', 'Test');
    fixture.componentRef.setInput('tooltipId', testId);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.getAttribute('id')).toBe(testId);
  });

  it('should have nui-tooltip class', () => {
    fixture.componentRef.setInput('content', 'Test');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.classList.contains('nui-tooltip')).toBe(true);
  });
});
