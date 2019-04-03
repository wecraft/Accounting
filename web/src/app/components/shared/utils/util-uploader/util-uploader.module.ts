import { NgModule } from "@angular/core";

import { SharedModule } from "../../shared.module";

import { UtilFileSelectorDirective } from "./util-file-selector.directive";
import { UtilFileFieldComponent } from "./util-file-field.component";

@NgModule({
	imports: [SharedModule],
	declarations: [UtilFileSelectorDirective, UtilFileFieldComponent],
	exports: [UtilFileSelectorDirective, UtilFileFieldComponent]
})
export class UtilUploaderModule {}
