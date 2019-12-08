import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherCollecteurComponent } from './afficher-collecteur.component';

describe('AfficherCollecteurComponent', () => {
  let component: AfficherCollecteurComponent;
  let fixture: ComponentFixture<AfficherCollecteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfficherCollecteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherCollecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
