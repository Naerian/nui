import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionMenuSubmenuComponent } from './action-menu-submenu.component';

describe('ActionMenuSubmenuComponent', () => {
  let component: ActionMenuSubmenuComponent;
  let fixture: ComponentFixture<ActionMenuSubmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionMenuSubmenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionMenuSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
