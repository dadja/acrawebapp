import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointeauComponent } from './pointeau.component';

describe('PointeauComponent', () => {
  let component: PointeauComponent;
  let fixture: ComponentFixture<PointeauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointeauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointeauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
