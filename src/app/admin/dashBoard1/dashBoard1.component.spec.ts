import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DashBoard1Component } from "./dashBoard1.component";

describe("DashBoard1Component", () => {
  let component: DashBoard1Component;
  let fixture: ComponentFixture<DashBoard1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashBoard1Component]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoard1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
