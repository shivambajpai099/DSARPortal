import { Component, OnInit, Input, NgZone, ViewChild } from "@angular/core";
import { requestService } from "../requestQueue/requestService";
import { request } from "src/app/Interfaces/requestQueue.interface";
import { RequestViewService } from "./RequestView.service";
import { ActivatedRoute } from "@angular/router";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { take } from "rxjs/operators";
import { config, from } from "rxjs";
import { Validators } from "@angular/forms";
import { MessageUser } from "src/app/Interfaces/messagetouser.interface";
import { ShowOnDirtyErrorStateMatcher, MatSnackBar } from "@angular/material";
import { FormControl, FormGroup, FormsModule } from "@angular/forms";
import { environment } from "src/environments/environment";
// import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-request-view",
  templateUrl: "./requestview.component.html",
  styleUrls: ["./requestview.component.css"]
})
export class RequestViewComponent implements OnInit {
  URL: string;
  message2;
  message1: string;
  tempdata: request;
  dataGetState: boolean;
  messageUser: MessageUser = {
    msgtouser: "",
    email: "",
    request_id: ""
  };
  max = 100;
  current;
  msg: string = "";
  dataSource = [
    {
      stage: "Request ID",
      value: null
    },
    {
      stage: "First Name",
      value: null
    },
    {
      stage: "Last Name",
      value: null
    },
    {
      stage: "Email",
      value: null
    },
    {
      stage: "Request Type",
      value: null
    },
    {
      stage: "Expires In",
      value: null
    },
    {
      stage: "Request Status",
      value: null
    },
    {
      stage: "File attached",
      value: null,
      url: true
    }
  ];
  displayedColumns = ["stage", "noofrequests"];
  statuses = [
    {
      label: "NEW",
      completed: false
    },
    {
      label: "Verify",
      completed: false
    },
    {
      label: "In-Progress",
      completed: false
    },
    {
      label: "Completed",
      completed: false
    }
  ];

  constructor(
    private sta: RequestViewService,
    private rou: ActivatedRoute,
    private snackBarService: MatSnackBar
  ) {
    this.URL = environment.configUrl;
    this.message1 = this.rou.snapshot.params["id"];
    this.message2 = this.rou.params.subscribe(params => {
      this.message2 = params["id"];
    });
    console.log("2222" + this.message2);
    console.log(this.statuses);
  }

  ngOnInit() {
    console.log(this.message1);
    //this.data.currentMessage.subscribe(message => this.message = message);
    this.getRequestInfo();
    //this.getRequestInfo();
  }

  changeStat(stat: number, id: string) {
    //  const message=this._route.snapshot['id'];
    this.sta.postInfo(stat, id).subscribe(() => {
      // this.getRequestInfo();
      this.getstatusUpdate();
    });
    console.log(id);
    console.log(stat);
  }

  getRequestInfo() {
    this.dataGetState = true;
    console.log("id:" + this.message1);
    this.sta.getConfig(this.message1).subscribe((data: request) => {
      this.dataGetState = false;
      console.log("3");
      this.tempdata = data;
      this.dataSource[0].value = this.tempdata.request_id;
      this.dataSource[1].value = this.tempdata.firstname;
      this.dataSource[2].value = this.tempdata.lastname;
      this.dataSource[3].value = this.tempdata.email;
      this.dataSource[4].value = this.tempdata.datareqlist;
      this.dataSource[5].value = this.tempdata.expiresIn;
      switch (this.tempdata.status) {
        case 1:
          this.dataSource[6].value = "NEW";
          break;
        case 2:
          this.dataSource[6].value = "VERIFY";
          break;
        case 3:
          this.dataSource[6].value = "IN-PROGRESS";
          break;
        case 4:
          this.dataSource[6].value = "COMPLETED";
          break;
      }
      // this.dataSource[6].value = this.tempdata.status;

      /* {
          request_id: item["request_id"],
          firstname: item["firstname"],
          lastname: item["lastname"],
          email: item["email"],
          phone_no: item["phone_no"],
          datareqlist: item["datareqlist"],
          status: item["status"]
        };*/
      this.URL = this.URL + "files/" + this.tempdata.filenewName;
      this.dataSource[7].value = this.URL;
      console.log(this.tempdata);
    });
  }

  getstatusUpdate() {
    console.log("entered");
    this.sta.getConfig(this.message1).subscribe((data: request) => {
      this.tempdata.status = data["status"];
      console.log("Here" + this.tempdata.status);
      switch (this.tempdata.status) {
        case 1:
          this.dataSource[6].value = "NEW";
          break;
        case 2:
          this.dataSource[6].value = "VERIFY";
          break;
        case 3:
          this.dataSource[6].value = "IN-PROGRESS";
          break;
        case 4:
          this.dataSource[6].value = "COMPLETED";
          break;
      }
      // this.dataSource[6].value = data["status"];
      // this.tempdata.status = data["status"];
      // console.log(this.tempdata.status);
    });
  }

  stepperChanged(event) {
    this.statuses.forEach((status, index) => {
      status.completed = index < event.selectedIndex + 1;
    });
    this.changeStat(event.selectedIndex + 1, this.tempdata.request_id);
  }

  onSubmit(msg: string) {
    if (msg.length === 0) {
      this.snackBarService.open("Message is empty", null, {
        duration: 1000
      });
    } else {
      console.log("enteredmsh");
      this.messageUser.msgtouser = msg;
      this.messageUser.request_id = this.tempdata.email;
      this.messageUser.email = this.tempdata.request_id;
      console.log(this.messageUser.msgtouser);
      this.sta.sendtext(this.messageUser).subscribe(res => {
        console.log(res);
        this.snackBarService.open("Message Sent Successfully", null, {
          duration: 1000
        });
        // window.alert("Message Sent Successfully");
        // this.openSnackBar("Message Sent Successfully");
      });
    }
  }

  onClear() {
    this.msg = "";
  }
  downloadfile() {
    this.sta.getFiles(this.tempdata.filenewName).subscribe((data: request) => {
      console.log(data);
    });
  }
  // openSnackBar(message: string) {
  //   this.snackBar.open(message);
  // }
}
