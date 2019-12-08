import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutDeviceComponent } from './ajout-device.component';

describe('AjoutDeviceComponent', () => {
  let component: AjoutDeviceComponent;
  let fixture: ComponentFixture<AjoutDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
