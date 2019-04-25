import { Injectable, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable()
export class TypeStyleService {
  URL: string;

  constructor(private httpClient: HttpClient) {
    this.URL = environment.configUrl;
  }

  postService(
    colorTemp: string,
    sizeTemp: string,
    maxLen: number,
    label: string,
    formTextRequired: boolean
  ) {
    console.log("start");
    console.log(colorTemp);
    return this.httpClient.post(this.URL + "setcss", {
      color: colorTemp,
      size: sizeTemp,
      max_length: maxLen,
      label: label,
      formTextRequired: formTextRequired
    });
  }
  postRqTypeList(requestName: string) {
    console.log(requestName);
    return this.httpClient.post(this.URL + "addnewrequesttype", {
      requestName: requestName
    });
  }
  postcolor(label: string, color: string) {
    return this.httpClient.post(this.URL + "setcolor", {
      color: color,
      label: label
    });
  }
  postsize(label: string, size: number) {
    return this.httpClient.post(this.URL + "setsize", {
      size: size,
      label: label
    });
  }
  postmaxlen(label: string, maxLen: number) {
    return this.httpClient.post(this.URL + "setmaxlength", {
      max_length: maxLen,
      label: label
    });
  }
  postrequired(label: string, formTextRequired: boolean) {
    return this.httpClient.post(this.URL + "setrequired", {
      formTextRequired: formTextRequired,
      label: label
    });
  }
}
