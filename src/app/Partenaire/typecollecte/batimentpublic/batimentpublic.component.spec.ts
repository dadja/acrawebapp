import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatimentpublicComponent } from './batimentpublic.component';

describe('BatimentpublicComponent', () => {
  let component: BatimentpublicComponent;
  let fixture: ComponentFixture<BatimentpublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatimentpublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatimentpublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
