import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDasboardComponent } from './user-dasboard.component';

describe('UserDasboardComponent', () => {
  let component: UserDasboardComponent;
  let fixture: ComponentFixture<UserDasboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDasboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
