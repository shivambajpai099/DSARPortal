import { Component, OnInit } from "@angular/core";
import { request } from "src/app/Interfaces/requestQueue.interface";
import { requestService } from "../requestQueue/requestService";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-requestlistbystatus",
  templateUrl: "./requestlistbystatus.component.html",
  styleUrls: ["./requestlistbystatus.component.css"]
})
export class RequestlistbystatusComponent implements OnInit {
  queue: Array<request>;
  tempdata: request;
  chart = [];
  dataGetState: boolean;
  status: string;
  page: number = 1;

  constructor(private sta: requestService, private _route: ActivatedRoute) {
    this.status = this._route.snapshot.params["requeststatus"];
    console.log(this.status);
  }

  ngOnInit() {
    console.log("1");
    this.getRequestqueInfobystatus();
    console.log("4");
  }

  getRequestqueInfobystatus() {
    this.dataGetState = true;
    this.sta.getlistbystatus(this.status).subscribe((data: any) => {
      this.dataGetState = false;
      console.log("3");
      this.queue = [];
      data.forEach(item => {
        this.tempdata = item;
        this.queue.push(this.tempdata);
      });
      console.log(this.queue);
    });
  }
}
