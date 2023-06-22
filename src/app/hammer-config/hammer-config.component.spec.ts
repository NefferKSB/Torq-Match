import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HammerConfigComponent } from './hammer-config.component';

describe('HammerConfigComponent', () => {
  let component: HammerConfigComponent;
  let fixture: ComponentFixture<HammerConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HammerConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HammerConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
