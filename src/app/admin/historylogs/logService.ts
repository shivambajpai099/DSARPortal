import { Injectable, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Observable, from } from "rxjs";
import { environment } from "src/environments/environment";
@Injectable()
export class logService {
  URL: string;
  constructor(private http: HttpClient) {
    this.URL = environment.configUrl;
  }

  getConfig(page: number, totalPages: number) {
    console.log("2");
    console.log(this.URL);
    page = totalPages - page + 1;
    console.log("Page:" + page);
    return this.http.get(this.URL + "logs/" + page);
  }
  pageDetails() {
    return this.http.get(this.URL + "logscount");
  }
  pagedatawithinfo(currpage: number) {
    currpage--;
    console.log("this..." + currpage);
    return this.http.get(this.URL + "logs?page=" + currpage + "&size=5");
  }
}
