import { Injectable, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { from } from "rxjs";
import { promise } from "protractor";
import { RtlScrollAxisType } from "@angular/cdk/platform";
import { Graph } from "src/app/Interfaces/requestbystatusGraph.interface";
@Injectable()
export class PieService {
  URL: string;

  constructor(private http: HttpClient) {
    this.URL = environment.configUrl;
  }
  getService() {
    console.log("2");
    console.log(this.URL + "getnoreq");
    return this.http.get(this.URL + "getnoreq");
  }
  getConfig() {
    return this.http.get(this.URL + "graphdata");
  }
}
