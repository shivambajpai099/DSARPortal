import { Component, OnInit, Inject } from "@angular/core";
import { TypeStyleService } from "./TypeStyleService";
import { FormControl, FormGroup, FormsModule } from "@angular/forms";
import { Validators } from "@angular/forms";
import { from } from "rxjs";
import { styleTypeService } from "src/app/UserForm/styleTypeService";
import { OwnStyle } from "src/app/Interfaces/style.interface";
import { UserFormComponent } from "src/app/UserForm/UserForm.component";
import { MatSnackBar } from "@angular/material";
@Component({
  selector: "app-customize-form",
  templateUrl: "./customizeForm.component.html",
  styleUrls: ["./customizeForm.component.css"]
})
export class CustomizeFormComponent {
  customizeForm = new FormGroup({
    color: new FormControl("", [Validators.required]),
    size: new FormControl("", [Validators.required]),
    maxChar: new FormControl(),
    styleLabel: new FormControl()
  });
  requesttypeform = new FormGroup({
    requesttype: new FormControl("", Validators.required)
  });
  updatenew = true;
  request: string = "";
  labels: string[] = [
    "For All",
    "FirstName",
    "LastName",
    "Email",
    "Phone",
    "RequestType"
  ];
  tempColor: string = "";
  tempSize: number = 20;
  //tempStyle: string;
  maxLen: number = 10;
  selected: string = "FirstName";
  //formTextRequired: boolean = false;
  constructor(
    private tsp: TypeStyleService,
    private stp: styleTypeService,
    private snackBarService: MatSnackBar
  ) {}

  /* setColor(event: any) {
    this.tempColor = event;
  }
  getColor() {
    return this.tempColor;
  }
  setSize(event: any) {
    this.tempSize = event;
  }
  getSize() {
    return this.tempSize;
  }
  setMaxLen(event: number) {
    this.maxLen = event;
  }*/
  /*setData(
    tempcolor: string,
    tempsize: string,
    maxLen: number,
    label: string,
    formTextRequired: boolean
  ) {
    console.log("hh");
    console.log("first");
    this.tsp
      .postService(tempcolor, tempsize, maxLen, label, formTextRequired)
      .subscribe(
        data => {
          this.updatenew = !this.updatenew;
          console.log("POST Request is successful ", data);
        },
        error => {
          console.log("Error", error);
        }
      );
    //location.reload();
  }*/
  addType(requestName: string) {
    console.log("11111");
    console.log(requestName);
    this.tsp.postRqTypeList(requestName).subscribe(data => {
      this.updatenew = !this.updatenew;
    });
    this.snackBarService.open("Request Type added Successfully", null, {
      duration: 1000
    });
  }

  setColor() {
    console.log("11111");
    this.tsp.postcolor(this.selected, this.tempColor).subscribe(data => {
      this.updatenew = !this.updatenew;
    });
  }
  setSize() {
    console.log("11111");
    this.tsp.postsize(this.selected, this.tempSize).subscribe(data => {
      this.updatenew = !this.updatenew;
    });
  }
  setMaxchar() {
    console.log("11111");
    this.tsp.postmaxlen(this.selected, this.maxLen).subscribe(data => {
      this.updatenew = !this.updatenew;
    });
  }
  setrequired(formTextRequired: boolean) {
    console.log("11111");
    this.tsp.postrequired(this.selected, formTextRequired).subscribe(data => {
      this.updatenew = !this.updatenew;
    });
  }
}
