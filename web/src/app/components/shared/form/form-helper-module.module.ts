import { NgModule } from "@angular/core";
import { InputErrorComponent } from "./input-error.component";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material.module";
@NgModule({
	imports: [CommonModule, MaterialModule],
	declarations: [InputErrorComponent],
	exports: [InputErrorComponent]
})
export class FormHelperModule {}
