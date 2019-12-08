import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutCollecteurComponent } from './ajout-collecteur.component';

describe('AjoutCollecteurComponent', () => {
  let component: AjoutCollecteurComponent;
  let fixture: ComponentFixture<AjoutCollecteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutCollecteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutCollecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
