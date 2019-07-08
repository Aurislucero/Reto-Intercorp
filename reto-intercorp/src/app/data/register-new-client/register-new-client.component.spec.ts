import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewClientComponent } from './register-new-client.component';

describe('RegisterNewClientComponent', () => {
  let component: RegisterNewClientComponent;
  let fixture: ComponentFixture<RegisterNewClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterNewClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNewClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
