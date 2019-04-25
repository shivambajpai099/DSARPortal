import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RequestQueueComponent } from "./requestQueue.component";

describe("RequestQueueComponent", () => {
  let component: RequestQueueComponent;
  let fixture: ComponentFixture<RequestQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestQueueComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
