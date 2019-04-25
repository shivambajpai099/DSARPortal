import { Inject, Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";

@Injectable()
export class AdminService {
  toggleDrawer$ = new BehaviorSubject(true);
}
