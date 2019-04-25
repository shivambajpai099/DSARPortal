import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainComponent } from "./main/main.component";
import { UserFormComponent } from "./UserForm/UserForm.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AdminComponent } from "./admin/admin.component";
import { LayoutModule } from "@angular/cdk/layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatFormFieldModule,
  MatOptionModule,
  MatInputModule,
  MatSelectModule,
  MatMenuModule,
  MatButtonToggleModule,
  MatTableModule,
  MatExpansionModule,
  MatStepperModule,
  MatSnackBarModule
} from "@angular/material";

import { RoundProgressModule } from "angular-svg-round-progressbar";
import { RequestQueueComponent } from "./admin/requestQueue/requestQueue.component";
import { CustomizeFormComponent } from "./admin/customizeForm/customizeForm.component";
import { styleTypeService } from "./UserForm/styleTypeService";
import { TypeStyleService } from "./admin/customizeForm/TypeStyleService";
import { logService } from "./admin/historylogs/logService";
import { from } from "rxjs";
import { ColorPickerModule } from "ngx-color-picker";
import { ChartsModule } from "ng2-charts";
import { UserFormSubmit } from "./UserFormSubmit/UserFormSubmit.component";
import { DashBoard1Component } from "./admin/dashBoard1/dashBoard1.component";
import { PieService } from "./admin/dashBoard1/PieService";
import { requestService } from "./admin/requestQueue/requestService";
import { RequestViewComponent } from "./admin/requestview/requestview.component";
import { RequestViewService } from "./admin/requestview/RequestView.service";
import { NgxPaginationModule } from "ngx-pagination";
import { HistoryLogsComponent } from "./admin/historylogs/historylogs.component";
import { RequestlistbystatusComponent } from "./admin/requestlistbystatus/requestlistbystatus.component";
import { AdminService } from "./admin.service";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UserFormComponent,
    AdminComponent,
    RequestQueueComponent,
    CustomizeFormComponent,
    UserFormSubmit,
    DashBoard1Component,
    RequestViewComponent,
    HistoryLogsComponent,
    RequestlistbystatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    ColorPickerModule,
    ChartsModule,
    MatProgressSpinnerModule,
    NgxPaginationModule,
    RoundProgressModule,
    MatButtonToggleModule,
    MatTableModule,
    MatExpansionModule,
    MatStepperModule,
    MatSnackBarModule
  ],
  providers: [
    styleTypeService,
    TypeStyleService,
    PieService,
    requestService,
    RequestViewService,
    logService,
    AdminService,
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
