import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClauseComponent } from './clause.component';

describe('ClauseComponent', () => {
  let component: ClauseComponent;
  let fixture: ComponentFixture<ClauseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClauseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
