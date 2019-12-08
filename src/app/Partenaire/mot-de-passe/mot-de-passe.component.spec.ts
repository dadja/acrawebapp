import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotDePasseComponent } from './mot-de-passe.component';

describe('MotDePasseComponent', () => {
  let component: MotDePasseComponent;
  let fixture: ComponentFixture<MotDePasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotDePasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotDePasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
