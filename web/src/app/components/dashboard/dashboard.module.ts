import { NgModule } from "@angular/core";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { SharedModule } from "../shared/shared.module";
import { AccountIconModule } from "../account/account-icon/account-icon.module";
import {
	MatPaginatorModule,
	MatTableModule,
	MatProgressSpinnerModule
} from "@angular/material";
import { ProjectModule } from "../project/project.module";
import { AppChartModule } from "../shared/app-chart/app-chart.module";

@NgModule({
	imports: [
		SharedModule,
		AccountIconModule,
		MatPaginatorModule,
		MatTableModule,
		MatProgressSpinnerModule,
		ProjectModule,
		AppChartModule
	],
	declarations: [DashboardComponent]
})
export class DashboardModule {}
