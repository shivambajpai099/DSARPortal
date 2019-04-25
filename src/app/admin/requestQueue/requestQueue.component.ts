import { Component, OnInit } from "@angular/core";
import { request } from "src/app/Interfaces/requestQueue.interface";
import { requestService } from "./requestService";
import { queue } from "rxjs/internal/scheduler/queue";
import { FormControl, FormGroup, FormsModule } from "@angular/forms";
import { Validators } from "@angular/forms";
import { PageData } from "src/app/Interfaces/PageData.interface";
import { from } from "rxjs";
@Component({
  selector: "app-request-queue",
  templateUrl: "./requestQueue.component.html",
  styleUrls: ["./requestQueue.component.css"]
})
export class RequestQueueComponent implements OnInit {
  queue: Array<request>;
  tempdata: request;
  dataGetState: boolean = true;
  pagestateprev: boolean = false;
  pagestatenext: boolean = true;
  pageexiststate: boolean;
  totalPages;
  totalpagesspcase;
  query = "";
  datafull: PageData;
  page: number = 1;
  pageext: number = 1;
  pagenew: number = 1;
  searchSelectvalue;
  noMatch: boolean = false;
  searchselectForm = new FormGroup({
    searchSelect: new FormControl("", [Validators.required])
  });
  constructor(private sta: requestService) {}
  ngOnInit() {
    console.log("1");
    this.getlistinfo(this.page);
    // this.getPageDetails();
    console.log("4");
    this.pageexiststate = false;
  }
  /* getPageDetails() {
    this.dataGetState = true;
    console.log("page1");
    this.sta.pageDetails().subscribe((res: any) => {
      this.totalPages = res["totalPages"];
      this.itemsPerPage = res["itemsPerPage"];
      this.totalCount = res["totalCount"];
      console.log(this.itemsPerPage, this.totalPages, this.totalCount);
      this.getRequestqueInfo();
    });
  }

  getRequestqueInfo() {
    this.sta.getConfig(this.page).subscribe((data: any) => {
      this.dataGetState = false;
      console.log(this.totalPages);
      console.log("3");
      this.queue = [];
      data.forEach(item => {
        this.tempdata = item;
        this.queue.push(this.tempdata);
      });
      console.log(this.queue);
    });
  }
  /* getbysearch(query: string) {
    console.log("inside:" + this.searchSelectvalue);
    if (query.length === 0) {
      this.dataGetState = true;
      this.page = 1;
      this.getPageDetails();
      this.pagestatenext = true;
    } else if (this.searchSelectvalue === "reqid") {
      this.dataGetState = true;
      console.log("1:" + this.searchSelectvalue);
      this.sta.pageDetailsforsearchbyID(query).subscribe((res: any) => {
        this.totalPages = res["totalPages"];
        this.itemsPerPage = res["itemsPerPage"];
        this.totalCount = res["totalCount"];
        console.log(this.itemsPerPage, this.totalPages, this.totalCount);
        this.sta.getlistbyID(query).subscribe((data: any) => {
          if (this.totalPages === 1) {
            this.pagestatenext = this.pagestateprev = false;
          }
          console.log("3");
          this.page = 1;
          this.queue = [];
          data.forEach(item => {
            this.tempdata = item;
            this.queue.push(this.tempdata);
            this.noMatch = false;
            this.dataGetState = false;
          });
          if (this.queue.length === 0) {
            this.noMatch = true;
            this.dataGetState = false;
          }
        });
        console.log(this.queue);
      });
    } else {
      this.dataGetState = true;
      console.log("HELLLLLLLLO");
      console.log(this.searchSelectvalue);
      this.sta.pageDetailsforsearchbyName(query).subscribe((res: any) => {
        this.totalPages = res["totalPages"];
        this.itemsPerPage = res["itemsPerPage"];
        this.totalCount = res["totalCount"];
        console.log(this.itemsPerPage, this.totalPages, this.totalCount);
        this.sta.getlistbyserviceName(query).subscribe((data: any) => {
          if (this.totalPages === 1) {
            this.pagestatenext = this.pagestateprev = false;
          }
          console.log("3");
          this.page = 1;
          this.queue = [];
          data.forEach(item => {
            this.tempdata = item;
            this.queue.push(this.tempdata);
            this.noMatch = false;
            this.dataGetState = false;
          });
          if (this.queue.length === 0) {
            this.noMatch = true;
            this.dataGetState = false;
          }
        });
        console.log(this.queue);
      });
    }
  }*/
  getbysearch(query: string) {
    console.log("inside:" + this.searchSelectvalue);
    if (query.length === 0) {
      this.dataGetState = true;
      this.page = 1;
      this.noMatch = false;
      this.getlistinfo(this.page);
      this.pagestatenext = true;
    } else if (this.searchSelectvalue === "reqid") {
      this.dataGetState = true;
      console.log("1:" + this.searchSelectvalue);
      this.sta.getlistbyserviceID(query).subscribe((data: PageData) => {
        this.dataGetState = false;
        this.page = 1;
        console.log("3");
        this.queue = data["content"];
        this.totalPages = data["totalPages"];
        console.log(this.queue);
        console.log(this.totalPages);
        if (this.totalPages === 1) {
          this.pagestatenext = this.pagestateprev = false;
        }
        this.noMatch = false;
        this.dataGetState = false;
        if (this.queue.length === 0) {
          this.noMatch = true;
          this.dataGetState = false;
          this.totalPages = this.totalpagesspcase;
        }
      });

      console.log(this.queue);
    } else {
      this.dataGetState = true;
      console.log("1:" + this.searchSelectvalue);
      this.sta.getlistbyserviceName(query).subscribe((data: PageData) => {
        this.dataGetState = false;
        this.page = 1;
        console.log("3");
        this.queue = data["content"];
        this.totalPages = data["totalPages"];
        console.log(this.queue);
        console.log(this.totalPages);
        if (this.totalPages === 1) {
          this.pagestatenext = this.pagestateprev = false;
        }
        this.noMatch = false;
        this.dataGetState = false;
        if (this.queue.length === 0) {
          this.noMatch = true;
          this.dataGetState = false;
          this.totalPages = this.totalpagesspcase;
        }
      });

      console.log(this.queue);
    }
  }

  decrement() {
    this.dataGetState = true;
    this.page--;
    this.pagenew = this.page;
    if (this.page <= 1) {
      this.pagestateprev = false;
      this.getlistinfo(this.page);
    } else if (this.page > 1) {
      this.pagestatenext = true;
      this.pagestateprev = true;
      this.getlistinfo(this.page);
    }
  }
  increment() {
    this.dataGetState = true;
    this.page++;
    this.pagenew = this.page;
    if (this.page < this.totalPages) {
      this.pagestatenext = this.pagestateprev = true;
      this.getlistinfo(this.page);
    } else if (this.page >= this.totalPages) {
      console.log("here" + this.totalPages);
      this.pagestatenext = false;
      this.getlistinfo(this.page);
    }
  }
  getlistinfo(newpage: number) {
    this.searchSelectvalue = "";
    this.dataGetState = true;
    console.log("IN HERE" + newpage + this.totalPages);
    if (newpage <= this.totalPages && newpage > 0) {
      this.page = this.pagenew = newpage;
      console.log(this.page + "neww");
      this.pageexiststate = false;
    } else this.pageexiststate = true;
    console.log(this.page + "/////");
    this.sta.getlistbyservice(this.page).subscribe((data: PageData) => {
      console.log("3");
      this.queue = data["content"];
      this.totalPages = data["totalPages"];
      console.log(this.totalPages);
      this.totalpagesspcase = this.totalPages;
      this.dataGetState = this.noMatch = false;
      this.query = "";
      //this.pagestatenext = true;
    });
  }
  getentire() {
    this.pagestatenext = true;
    console.log("entered" + this.pageext);
    this.getlistinfo(this.pageext);
  }
}
