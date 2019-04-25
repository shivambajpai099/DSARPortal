import { Component, OnInit } from "@angular/core";
import { PieService } from "./PieService";
import { DashBoardInfo } from "src/app/Interfaces/dashBoardinfo.interface";
import { from } from "rxjs";
import { SingleDataSet, ChartsModule } from "ng2-charts";
import { AppComponent } from "src/app/app.component";
import { Chart } from "chart.js";
import { Graph } from "src/app/Interfaces/requestbystatusGraph.interface";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-dash-board1",
  templateUrl: "./dashBoard1.component.html",
  styleUrls: ["./dashBoard1.component.css"]
})
export class DashBoard1Component implements OnInit {
  chart = [];
  dataGetState: boolean;
  status: string;
  labels: Array<string>;
  datas: Array<number>;
  tempdatagraph: Graph;
  dat: string;
  cnt: number;
  piegraphstatus: boolean = true;
  timegraphstatus: boolean = false;
  pagedatastatus: boolean = true;
  graphbutton: string = "Time Graph";
  public pieChartLabels = [
    "Request New ",
    "Request Verified ",
    "Request In-Progress ",
    "Request Completed "
  ];
  public pieData = [];
  public pieChartType = "pie";
  dataSource = [
    {
      stage: "New",
      value: null,
      link: "/admin/listbystatus/1"
    },
    {
      stage: "Verify",
      value: null,
      link: "/admin/listbystatus/2"
    },
    {
      stage: "In-Progress",
      value: null,
      link: "/admin/listbystatus/3"
    },
    {
      stage: "Completed",
      value: null,
      link: "/admin/listbystatus/4"
    }
  ];
  displayedColumns = ["stage", "noofrequests"];

  constructor(private pieService: PieService) {}
  ngOnInit() {
    this.pieChartData();
  }
  pieChartData() {
    console.log("1");
    this.dataGetState = true;
    this.pieService.getService().subscribe((data: DashBoardInfo) => {
      this.dataGetState = false;
      this.pieData[0] = data["new_state"];
      this.pieData[1] = data["verify"];
      this.pieData[2] = data["in_progress"];
      this.pieData[3] = data["completed"];
      this.dataSource[0].value = data["new_state"];
      this.dataSource[1].value = data["verify"];
      this.dataSource[2].value = data["in_progress"];
      this.dataSource[3].value = data["completed"];
      console.log(this.pieData);
    });
    console.log("p" + this.pieData);
  }
  private options: any = {
    legend: { position: "bottom" }
  };
  getgraphInfo() {
    this.pieService.getConfig().subscribe((data: any) => {
      this.labels = [];
      this.datas = [];
      data.forEach(item => {
        this.dat = item["date"];
        this.cnt = item["count"];
        this.labels.push(this.dat);
        this.datas.push(this.cnt);
      });

      console.log(this.labels);
      console.log(this.datas);
      this.chart = new Chart("canvas", {
        type: "line",
        data: {
          labels: this.labels,
          datasets: [
            {
              label: "New Requests Logged",
              data: this.datas,
              borderColor: "#3cba9f",
              fill: true
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
      this.pagedatastatus = true;
    });
  }
  typegraph(graphtype: string) {
    if (graphtype === "Time Graph") {
      this.piegraphstatus = this.pagedatastatus = false;
      this.timegraphstatus = true;
      this.getgraphInfo();
      this.graphbutton = "Pie Graph";
    } else {
      this.piegraphstatus = true;
      this.timegraphstatus = false;
      this.graphbutton = "Time Graph";
    }
  }
}
