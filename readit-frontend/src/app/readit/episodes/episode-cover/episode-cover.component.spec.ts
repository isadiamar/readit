import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeCoverComponent } from './episode-cover.component';

describe('EpisodeCoverComponent', () => {
  let component: EpisodeCoverComponent;
  let fixture: ComponentFixture<EpisodeCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpisodeCoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
