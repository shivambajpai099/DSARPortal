import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AdminService } from "../admin.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  opened = true;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.adminService.toggleDrawer$.subscribe((toggle: boolean) => {
      this.opened = toggle;
    });
  }

  toggleDrawer() {
    this.opened = !this.opened;
  }
}
