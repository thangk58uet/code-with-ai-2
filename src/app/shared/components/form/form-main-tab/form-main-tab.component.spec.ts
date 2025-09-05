import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMainTabComponent } from './form-main-tab.component';

describe('FormMainTabComponent', () => {
  let component: FormMainTabComponent;
  let fixture: ComponentFixture<FormMainTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMainTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMainTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
