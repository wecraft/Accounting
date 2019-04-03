import { NgModule } from "@angular/core";
import { UtilsSortComponent } from "./utils-sort.component";
import { SharedModule } from "../../shared.module";

@NgModule({
	imports: [SharedModule],
	declarations: [UtilsSortComponent],
	exports: [UtilsSortComponent]
})
export class UtilsSortModule {}
