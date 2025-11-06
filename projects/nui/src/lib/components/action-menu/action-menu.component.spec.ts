import { TestBed } from '@angular/core/testing';
import { ActionMenuComponent } from './action-menu.component';

describe('ActionMenuComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionMenuComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ActionMenuComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
