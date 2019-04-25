import { Injectable, Input } from "@angular/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Observable, from } from "rxjs";
import { environment } from "src/environments/environment";
import { PageData } from "src/app/Interfaces/PageData.interface";
@Injectable()
export class requestService {
  URL: string;
  //configUrl = 'assets/config.json';

  constructor(private http: HttpClient) {
    this.URL = environment.configUrl;
  }
  /* pageDetails() {
    console.log("page2");
    return this.http.get(this.URL + "count");
  }
  pageDetailsforsearchbyID(query: string) {
    console.log("page2");
    return this.http.get(this.URL + "searchcount/" + query);
  }
  pageDetailsforsearchbyName(query: string) {
    console.log("page2");
    return this.http.get(this.URL + "searchnamecount/" + query);
  }

  getConfig(page: number) {
    console.log("2");
    console.log(this.URL);
    return this.http.get(this.URL + "request/all/page/" + page);
  }
  getlistbyID(query: string) {
    console.log("Ent");
    return this.http.get(this.URL + "request/" + query);
  }
  getlistbyName(query: string) {
    console.log("Ent");
    return this.http.get(this.URL + "request/name/" + query);
  }*/
  getlistbystatus(status: string) {
    return this.http.get(this.URL + "request/all/" + status);
  }

  getlistbyservice(pageno: number) {
    pageno--;
    const page = pageno.toString();
    const size = "5";
    return this.http.get(this.URL + "request/all/page", {
      params: { page, size }
    });
    /* return this.http.get(
      this.URL + "request/all/page?page=" + currpage + "&size=5"
    );*/
  }
  getlistbyserviceID(query: string) {
    const page = "0";
    const size = "5";
    return this.http.get(this.URL + "request/" + query, {
      params: { page, size }
    });
    //return this.http.get(this.URL + "request/" + query + "?page=0" + "&size=5");
  }
  getlistbyserviceName(query: string) {
    const page = "0";
    const size = "5";
    return this.http.get(this.URL + "request/name/" + query, {
      params: { page, size }
    });
    // return this.http.get(
    // this.URL + "request/name/" + query + "?page=0" + "&size=5"
    // );
  }
}
