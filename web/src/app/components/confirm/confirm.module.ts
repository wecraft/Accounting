import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfirmComponent } from "./confirm.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
	imports: [SharedModule],
	declarations: [ConfirmComponent],
	entryComponents: [ConfirmComponent]
})
export class ConfirmModule {}
