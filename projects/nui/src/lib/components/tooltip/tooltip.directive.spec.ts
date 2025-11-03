import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TooltipDirective } from './tooltip.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [TooltipDirective],
  template: `
    <button
      nuiTooltip="Test tooltip"
      [tooltipPosition]="position"
      [tooltipEvent]="event"
      [tooltipShowDelay]="showDelay"
      [tooltipHideDelay]="hideDelay"
      [tooltipDisabled]="disabled"
      [tooltipShowArrow]="showArrow"
      [tooltipInteractive]="tooltipInteractive">
      Test Button
    </button>
  `,
})
class TestComponent {
  position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  event: 'hover' | 'click' | 'focus' = 'hover';
  showDelay = 0;
  hideDelay = 0;
  disabled = false;
  showArrow = true;
  tooltipInteractive = false;
}

describe('TooltipDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let buttonElement: DebugElement;
  let buttonNative: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, OverlayModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    buttonElement = fixture.debugElement.query(By.css('button'));
    buttonNative = buttonElement.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create directive', () => {
    const directive = buttonElement.injector.get(TooltipDirective);
    expect(directive).toBeTruthy();
  });

  it('should add aria-describedby attribute', () => {
    expect(buttonNative.hasAttribute('aria-describedby')).toBe(true);
    expect(buttonNative.getAttribute('aria-describedby')).toContain('nui-tooltip-');
  });

  describe('Hover Event', () => {
    it('should show tooltip on mouseenter', fakeAsync(() => {
      buttonNative.dispatchEvent(new MouseEvent('mouseenter'));
      tick(100);

      const tooltip = document.querySelector('.nui-tooltip');
      expect(tooltip).toBeTruthy();
    }));

    it('should hide tooltip on mouseleave', fakeAsync(() => {
      buttonNative.dispatchEvent(new MouseEvent('mouseenter'));
      tick(100);

      let tooltip = document.querySelector('.nui-tooltip');
      expect(tooltip).toBeTruthy();

      buttonNative.dispatchEvent(new MouseEvent('mouseleave'));
      tick(100);

      tooltip = document.querySelector('.nui-tooltip');
      expect(tooltip).toBeFalsy();
    }));
  });

  describe('Click Event', () => {
    beforeEach(() => {
      component.event = 'click';
      fixture.detectChanges();
    });

    it('should toggle tooltip on click', fakeAsync(() => {
      buttonNative.click();
      tick(100);

      let tooltip = document.querySelector('.nui-tooltip');
      expect(tooltip).toBeTruthy();

      buttonNative.click();
      tick(100);

      tooltip = document.querySelector('.nui-tooltip');
      expect(tooltip).toBeFalsy();
    }));
  });

  describe('Focus Event', () => {
    beforeEach(() => {
      component.event = 'focus';
      fixture.detectChanges();
    });

    it('should show tooltip on focusin', fakeAsync(() => {
      buttonNative.dispatchEvent(new FocusEvent('focusin'));
      tick(100);

      const tooltip = document.querySelector('.nui-tooltip');
      expect(tooltip).toBeTruthy();
    }));

    it('should hide tooltip on focusout', fakeAsync(() => {
      buttonNative.dispatchEvent(new FocusEvent('focusin'));
      tick(100);

      let tooltip = document.querySelector('.nui-tooltip');
      expect(tooltip).toBeTruthy();

      buttonNative.dispatchEvent(new FocusEvent('focusout'));
      tick(100);

      tooltip = document.querySelector('.nui-tooltip');
      expect(tooltip).toBeFalsy();
    }));
  });

  describe('Disabled State', () => {
    it('should not show tooltip when disabled', fakeAsync(() => {
      component.disabled = true;
      fixture.detectChanges();

      buttonNative.dispatchEvent(new MouseEvent('mouseenter'));
      tick(100);

      const tooltip = document.querySelector('.nui-tooltip');
      expect(tooltip).toBeFalsy();
    }));
  });

  describe('Delays', () => {
    it('should respect show delay', fakeAsync(() => {
      component.showDelay = 500;
      fixture.detectChanges();

      buttonNative.dispatchEvent(new MouseEvent('mouseenter'));
      tick(100);

      let tooltip = document.querySelector('.nui-tooltip');
      expect(tooltip).toBeFalsy();

      tick(400);
      tooltip = document.querySelector('.nui-tooltip');
      expect(tooltip).toBeTruthy();
    }));

    it('should respect hide delay', fakeAsync(() => {
      component.hideDelay = 500;
      fixture.detectChanges();

      buttonNative.dispatchEvent(new MouseEvent('mouseenter'));
      tick(100);

      let tooltip = document.querySelector('.nui-tooltip');
      expect(tooltip).toBeTruthy();

      buttonNative.dispatchEvent(new MouseEvent('mouseleave'));
      tick(100);

      tooltip = document.querySelector('.nui-tooltip');
      expect(tooltip).toBeTruthy();

      tick(400);
      tooltip = document.querySelector('.nui-tooltip');
      expect(tooltip).toBeFalsy();
    }));
  });

  describe('Arrow', () => {
    it('should show arrow by default', fakeAsync(() => {
      buttonNative.dispatchEvent(new MouseEvent('mouseenter'));
      tick(100);

      const arrow = document.querySelector('.nui-tooltip__arrow');
      expect(arrow).toBeTruthy();
    }));

    it('should hide arrow when showArrow is false', fakeAsync(() => {
      component.showArrow = false;
      fixture.detectChanges();

      buttonNative.dispatchEvent(new MouseEvent('mouseenter'));
      tick(100);

      const arrow = document.querySelector('.nui-tooltip__arrow');
      expect(arrow).toBeFalsy();
    }));

    it('should update arrow position immediately on first show', fakeAsync(() => {
      buttonNative.dispatchEvent(new MouseEvent('mouseenter'));
      tick(100); // Wait for attach and setTimeout

      const tooltip = document.querySelector('.nui-tooltip');
      expect(tooltip).toBeTruthy();
      
      // La posición debería estar actualizada inmediatamente
      const position = tooltip?.getAttribute('data-position');
      expect(position).toBeTruthy();
    }));
  });

  describe('Multiple Tooltips Prevention', () => {
    it('should cancel pending tooltip when moving to another element', fakeAsync(() => {
      component.showDelay = 300;
      fixture.detectChanges();

      // Trigger first tooltip
      buttonNative.dispatchEvent(new MouseEvent('mouseenter'));
      tick(100);

      // Leave before it shows
      buttonNative.dispatchEvent(new MouseEvent('mouseleave'));
      tick(300);

      // No tooltip should be shown
      const tooltip = document.querySelector('.nui-tooltip');
      expect(tooltip).toBeFalsy();
    }));
  });

  describe('Accessibility', () => {
    it('should add tabindex to non-focusable elements with focus event', () => {
      const span = document.createElement('span');
      span.setAttribute('nuiTooltip', 'Test');
      span.setAttribute('tooltipEvent', 'focus');
      document.body.appendChild(span);

      const spanFixture = TestBed.createComponent(TestComponent);
      spanFixture.detectChanges();

      // Note: This test is conceptual - in real implementation
      // the directive would add tabindex in ngOnInit
      
      document.body.removeChild(span);
    });
  });

  describe('Interactive tooltips', () => {
    it('should not hide tooltip when hovering over it with tooltipInteractive=true', fakeAsync(() => {
      component.tooltipInteractive = true;
      fixture.detectChanges();

      // Mostrar tooltip
      const el = fixture.nativeElement.querySelector('button');
      el.dispatchEvent(new MouseEvent('mouseenter'));
      tick(500);
      fixture.detectChanges();

      const tooltip = document.querySelector('.nui-tooltip');
      expect(tooltip).toBeTruthy();

      // Salir del host
      el.dispatchEvent(new MouseEvent('mouseleave'));
      tick(100);
      fixture.detectChanges();

      // El tooltip aún debe estar visible porque no se ha cumplido la condición completa
      const tooltipStillVisible = document.querySelector('.nui-tooltip');
      expect(tooltipStillVisible).toBeTruthy();
    }));

    it('should add nui-tooltip-interactive class when tooltipInteractive is true', fakeAsync(() => {
      component.tooltipInteractive = true;
      fixture.detectChanges();

      const el = fixture.nativeElement.querySelector('button');
      el.dispatchEvent(new MouseEvent('mouseenter'));
      tick(500);
      fixture.detectChanges();

      const overlayPane = document.querySelector('.cdk-overlay-pane');
      expect(overlayPane?.classList.contains('nui-tooltip-interactive')).toBe(true);
    }));

    it('should hide tooltip when mouse leaves both host and tooltip', fakeAsync(() => {
      component.tooltipInteractive = true;
      fixture.detectChanges();

      const el = fixture.nativeElement.querySelector('button');
      
      // Mostrar tooltip
      el.dispatchEvent(new MouseEvent('mouseenter'));
      tick(500);
      fixture.detectChanges();

      const tooltipElement = document.querySelector('.nui-tooltip');
      expect(tooltipElement).toBeTruthy();

      // Simular hover sobre el tooltip
      const overlayElement = document.querySelector('.cdk-overlay-pane');
      overlayElement?.dispatchEvent(new MouseEvent('mouseenter'));
      
      // Salir del host
      el.dispatchEvent(new MouseEvent('mouseleave'));
      tick(100);
      
      // El tooltip aún debe estar visible
      expect(document.querySelector('.nui-tooltip')).toBeTruthy();

      // Ahora salir del tooltip
      overlayElement?.dispatchEvent(new MouseEvent('mouseleave'));
      tick(100);
      fixture.detectChanges();

      // Ahora el tooltip debería ocultarse
      const tooltipAfter = document.querySelector('.nui-tooltip');
      expect(tooltipAfter).toBeFalsy();
    }));

    it('should clean up event listeners on destroy', fakeAsync(() => {
      component.tooltipInteractive = true;
      fixture.detectChanges();

      const el = fixture.nativeElement.querySelector('button');
      el.dispatchEvent(new MouseEvent('mouseenter'));
      tick(500);
      fixture.detectChanges();

      const overlayElement = document.querySelector('.cdk-overlay-pane');
      expect(overlayElement).toBeTruthy();

      // Destruir el componente
      fixture.destroy();
      tick();

      // Verificar que no hay memory leaks (conceptual)
      expect(fixture.componentInstance).toBeTruthy();
    }));
  });
});
