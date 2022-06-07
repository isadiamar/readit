import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GenreCoverComponent} from './genre-cover.component';

describe('GenreCoverComponent', () => {
  let component: GenreCoverComponent;
  let fixture: ComponentFixture<GenreCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenreCoverComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
