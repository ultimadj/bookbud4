/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginRouterOutletComponent } from './login-router-outlet.component';

describe('LoginRouterOutletComponent', () => {
  let component: LoginRouterOutletComponent;
  let fixture: ComponentFixture<LoginRouterOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRouterOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
