import { NgModule } from "@angular/core";
import { AppChartComponent } from "./app-chart.component";
import { SharedModule } from "../shared.module";

@NgModule({
	imports: [SharedModule],
	declarations: [AppChartComponent],
	exports: [AppChartComponent]
})
export class AppChartModule {}
