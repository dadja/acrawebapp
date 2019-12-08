import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherDeviceComponent } from './afficher-device.component';

describe('AfficherDeviceComponent', () => {
  let component: AfficherDeviceComponent;
  let fixture: ComponentFixture<AfficherDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfficherDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
