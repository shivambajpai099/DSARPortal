import { Injectable, Input } from "@angular/core";
import { HttpClient, HttpRequest, HttpEvent } from "@angular/common/http";
import { OwnStyle } from "../Interfaces/style.interface";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Observable, from } from "rxjs";
import { TypeInfo } from "../Interfaces/TypeInfo.interface";
import { environment } from "src/environments/environment";

@Injectable()
export class styleTypeService {
  URL: string;
  styleNew: OwnStyle;

  //configUrl = 'assets/config.json';
  constructor(private http: HttpClient) {
    this.URL = environment.configUrl;
  }

  getConfig() {
    console.log("2");
    return this.http.get(this.URL + "color");
  }
  getrqList() {
    return this.http.get(this.URL + "requesttypelist");
    // return this.http.get('http://localhost:4200/posts');
  }

  postInfo(infoType: TypeInfo) {
    return this.http.post(
      this.URL + "add",
      infoType
      /*{
       "fName":infoType.fName,
       "lName":infoType.lName,
       "email":infoType.email,
       "phno":infoType.phno,
       "tor":infoType.tor


     }*/
    );
  }
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append("file", file);
    const req = new HttpRequest("POST", this.URL + "post", formdata, {
      reportProgress: true,
      responseType: "text"
    });
    return this.http.request(req);
  }
  getFiles(filename: string): Observable<any> {
    return this.http.get(this.URL + "files/" + filename);
  }
}
