import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatimentpriveComponent } from './batimentprive.component';

describe('BatimentpriveComponent', () => {
  let component: BatimentpriveComponent;
  let fixture: ComponentFixture<BatimentpriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatimentpriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatimentpriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
