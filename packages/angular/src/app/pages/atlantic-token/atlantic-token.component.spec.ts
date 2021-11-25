import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlanticTokenComponent } from './atlantic-token.component';

describe('AtlanticTokenComponent', () => {
  let component: AtlanticTokenComponent;
  let fixture: ComponentFixture<AtlanticTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtlanticTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlanticTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
