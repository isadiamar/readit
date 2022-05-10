import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryCoverComponent } from './story-cover.component';

describe('StoryCoverComponent', () => {
  let component: StoryCoverComponent;
  let fixture: ComponentFixture<StoryCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryCoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
