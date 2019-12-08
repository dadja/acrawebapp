import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherPartenaireComponent } from './afficher-partenaire.component';

describe('AfficherPartenaireComponent', () => {
  let component: AfficherPartenaireComponent;
  let fixture: ComponentFixture<AfficherPartenaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfficherPartenaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherPartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
