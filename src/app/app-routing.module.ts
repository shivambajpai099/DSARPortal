import { NgModule } from "@angular/core";
import { Routes, RouterModule, ActivatedRoute } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { switchMap } from "rxjs/operators";
import { from } from "rxjs";
import { ChartsModule } from "ng2-charts";
import { BrowserModule } from "@angular/platform-browser";
import { AdminComponent } from "./admin/admin.component";
import { RequestQueueComponent } from "./admin/requestQueue/requestQueue.component";
import { CustomizeFormComponent } from "./admin/customizeForm/customizeForm.component";
import { UserFormComponent } from "./UserForm/UserForm.component";
import { DashBoard1Component } from "./admin/dashBoard1/dashBoard1.component";
import { UserFormSubmit } from "./UserFormSubmit/UserFormSubmit.component";
import { RequestViewComponent } from "./admin/requestview/requestview.component";
import { HistoryLogsComponent } from "./admin/historylogs/historylogs.component";
import { RequestlistbystatusComponent } from "./admin/requestlistbystatus/requestlistbystatus.component";
const routes: Routes = [
  { path: "main", component: MainComponent },
  { path: "user", component: UserFormComponent },
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dboard", component: DashBoard1Component },
      { path: "logs", component: HistoryLogsComponent },
      { path: "customizeform", component: CustomizeFormComponent },
      { path: "requestqueue", component: RequestQueueComponent },
      { path: "view/:id", component: RequestViewComponent },
      {
        path: "listbystatus/:requeststatus",
        component: RequestlistbystatusComponent
      }
    ]
  },
  { path: "userformsuccess", component: UserFormSubmit },
  { path: "", redirectTo: "/main", pathMatch: "full" }
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes), ChartsModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
