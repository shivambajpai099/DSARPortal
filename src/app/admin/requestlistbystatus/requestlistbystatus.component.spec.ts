import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestlistbystatusComponent } from './requestlistbystatus.component';

describe('RequestlistbystatusComponent', () => {
  let component: RequestlistbystatusComponent;
  let fixture: ComponentFixture<RequestlistbystatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestlistbystatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestlistbystatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
