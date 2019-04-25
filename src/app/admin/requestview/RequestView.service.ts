import { Injectable, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { DataService } from "src/app/DataService.service";
import { environment } from "src/environments/environment";

import { Observable, from } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { MessageUser } from "src/app/Interfaces/messagetouser.interface";
@Injectable()
export class RequestViewService {
  URL: string;
  //configUrl = 'assets/config.json';
  constructor(private http: HttpClient) {
    this.URL = environment.configUrl;
  }

  getConfig(val: string) {
    console.log(val);
    console.log("2");
    return this.http.get(this.URL + "requestdetails/" + val);
  }
  /* 
  getConfig(val: string) {
    return this.http.get(this.URL + "requestdetails/", { params: { val } });
  }*/
  postInfo(stat: number, id: string) {
    return this.http.put<null>(this.URL + "change/" + id + "/" + stat, null);
  }
  sendtext(info: MessageUser) {
    console.log("info entered");
    console.log(info);
    return this.http.post(this.URL + "sendemail", info);
  }
  getFiles(filename: string): Observable<any> {
    return this.http.get(this.URL + "files/" + filename);
  }
}
