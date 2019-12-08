import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatrineComponent } from './latrine.component';

describe('LatrineComponent', () => {
  let component: LatrineComponent;
  let fixture: ComponentFixture<LatrineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatrineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatrineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
