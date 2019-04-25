import { Component, OnInit, Input, Output, OnChanges } from "@angular/core";
import { OwnStyle } from "../Interfaces/style.interface";
import { styleTypeService } from "./styleTypeService";
import { from } from "rxjs";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { HttpResponse, HttpEventType } from "@angular/common/http";

import { take } from "rxjs/operators";
import { TypeInfo } from "../Interfaces/TypeInfo.interface";

@Component({
  selector: "app-user-form",
  templateUrl: "./userForm.component.html",
  styleUrls: ["./userForm.component.css"]
})
export class UserFormComponent implements OnInit, OnChanges {
  @Input("updatenew") update;
  tempStyle: OwnStyle;
  max_length = 5;
  tempRequest: string;
  dataGetState: boolean = true;
  emailState: boolean = false;
  firstnameState: boolean = false;
  lastnameState: boolean = false;
  phoneState: boolean = false;
  styleList: Array<OwnStyle>;
  selectedFiles: FileList;
  currentFileUpload: File;
  filenewname: string;
  progress: { percentage: number } = { percentage: 0 };
  constructor(
    private stp: styleTypeService,
    private formBuilder: FormBuilder
  ) {}

  ngOnChanges() {
    this.getreqList();
    this.myStyles();
  }
  ngOnInit() {
    this.myStyles();
    this.getreqList();
  }
  /* userForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", [Validators.required]),
    RT: new FormControl()
  });*/
  userForm: FormGroup;
  info: TypeInfo = {
    firstname: "",
    lastname: "",
    email: "",
    phone_no: "",
    datareqlist: [],
    filename: "",
    filenewName: ""
    // fileName: ""
  };
  // statecheckstate: boolean[] = [false, false, false, false, false];
  choices: string[] = [];

  @Output() myStyles() {
    // this.dataGetState = true;
    this.stp.getConfig().subscribe((data: any) => {
      this.dataGetState = false;
      this.styleList = [];
      data.forEach(item => {
        this.tempStyle = item;
        /*{
          color: time["color"],
          size: time["size"],
          max_length: time["max_length"],
          label: time["label"],
          formTextRequired: time["formTextRequired"]
        };*/
        this.styleList.push(this.tempStyle);
      });
      this.buildForm();
      console.log(this.styleList);
    });
  }

  sendInfo() {
    console.log(this.info);
    console;
    this.stp.postInfo(this.info).subscribe(
      data => {
        console.log("POST Request is successful ", data);
      },
      error => {
        console.log("Error", error);
      }
    );
  }

  @Output() getreqList() {
    const temparray = [];
    this.stp.getrqList().subscribe((data: any) => {
      data.forEach(time => {
        this.tempRequest = time["requestName"];
        temparray.push(this.tempRequest);
      });
      console.log(temparray);
    });
    this.choices = temparray;
    console.log(this.choices);
    return this.choices;
  }

  @Output() buildForm() {
    this.userForm = this.formBuilder.group({
      firstName: this.styleList[0].formTextRequired
        ? [null, [Validators.required]]
        : [],
      lastName: this.styleList[1].formTextRequired
        ? ["", [Validators.required]]
        : [],
      email: this.styleList[2].formTextRequired
        ? ["", [Validators.required, Validators.email]]
        : [],
      phone: this.styleList[3].formTextRequired
        ? ["", [Validators.required]]
        : [],
      RT: this.styleList[4].formTextRequired ? ["", [Validators.required]] : [],
      filename: []
    });
  }
  setState(choice: number) {
    console.log(choice);
    switch (choice) {
      case 0:
        if (
          this.info.firstname.length > 0 &&
          this.info.firstname.length > this.styleList[0].max_length
        )
          this.firstnameState = true;
        else this.firstnameState = false;
      case 1:
        if (
          this.info.lastname.length > 0 &&
          this.info.lastname.length > this.styleList[1].max_length
        )
          this.lastnameState = true;
        else this.lastnameState = false;
      case 2:
        if (this.info.email.length > 0) this.emailState = true;
        else this.emailState = false;
      case 3:
        if (
          this.info.phone_no.length > 0 &&
          this.info.phone_no.length > this.styleList[3].max_length
        )
          this.phoneState = true;
        else this.phoneState = false;
    }
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    let file = event.target.files[0];

    this.info.filenewName = file.name;
    console.log(this.info.filenewName);
  }

  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.stp.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(
          (100 * event.loaded) / event.total
        );
      } else if (event instanceof HttpResponse) {
        console.log("File is completely uploaded!");
      }
    });
    this.selectedFiles = undefined;
  }
  // setStatecheck(typedinfo: string, choice: number) {
  //   if (typedinfo.length > this.styleList[choice].max_length)
  //     this.statecheckstate[choice] = true;
  //   else this.statecheckstate[choice] = false;
  // }
}
