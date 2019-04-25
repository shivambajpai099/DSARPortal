import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HistoryLogsComponent } from "./historylogs.component";

describe("HistoryLogsComponent", () => {
  let component: HistoryLogsComponent;
  let fixture: ComponentFixture<HistoryLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryLogsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
