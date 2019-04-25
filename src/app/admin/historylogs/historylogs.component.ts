import { Component, OnInit } from "@angular/core";
import { logs } from "src/app/Interfaces/logs.interface";
import { logService } from "./logService";
import { from } from "rxjs";
import { PageData } from "src/app/Interfaces/PageData.interface";
@Component({
  selector: "app-history-logs",
  templateUrl: "./historylogs.component.html",
  styleUrls: ["./historylogs.component.css"]
})
export class HistoryLogsComponent implements OnInit {
  queue: Array<logs>;
  tempdata: logs;
  dataGetState: boolean;
  page: number = 1;
  totalPages;
  totalCount;
  itemsPerPage;
  pagenew: number = 1;
  pageexiststate: boolean;
  pagestateprev: boolean = false;
  pagestatenext: boolean = true;
  constructor(private sta: logService) {}
  ngOnInit() {
    console.log("1");
    this.getRequestqueInfonew(this.page);
    this.pageexiststate = false;
  }
  getRequestqueInfonew(pagenew: number) {
    this.dataGetState = true;
    if (this.pagenew <= this.totalPages) {
      this.page = pagenew;
      console.log(this.page + "neww");
      this.pageexiststate = false;
    } else this.pageexiststate = true;
    console.log("aFTER INSUD" + this.page);
    this.sta.pagedatawithinfo(this.page).subscribe((data: any) => {
      console.log(this.totalPages);
      console.log("3");
      this.dataGetState = false;

      console.log("3");
      this.queue = data["content"];
      this.totalPages = data["totalPages"];
      console.log(this.queue);
      console.log(this.totalPages);
      //this.queue.reverse();
      this.dataGetState = false;
      console.log(this.queue);
    });
  }
  decrement() {
    this.page--;
    if (this.page <= 1) {
      this.pagestateprev = false;
      this.getRequestqueInfonew(this.page);
    } else if (this.page > 1) {
      this.pagestatenext = true;
      this.pagestateprev = true;
      this.getRequestqueInfonew(this.page);
    }
  }
  increment() {
    this.page++;
    console.log(this.page + "inside");
    if (this.page < this.totalPages) {
      this.pagestatenext = this.pagestateprev = true;
      this.getRequestqueInfonew(this.page);
    } else if (this.page >= this.totalPages) {
      console.log("here" + this.totalPages);
      this.pagestatenext = false;
      this.getRequestqueInfonew(this.page);
    }
  }
}
