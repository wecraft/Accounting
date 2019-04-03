import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared.module";
import { UtilImageEditorComponent } from "./util-image-editor.component";
import { UtilImageZoomComponent } from "./util-image-zoom.component";
import { NouisliderModule } from "ng2-nouislider";
import { UtilImageComponent } from "./util-image.component";
import { UtilUploaderModule } from "../util-uploader/util-uploader.module";

@NgModule({
	imports: [SharedModule, NouisliderModule, UtilUploaderModule],
	declarations: [
		UtilImageEditorComponent,
		UtilImageZoomComponent,
		UtilImageComponent
	],
	exports: [
		UtilImageZoomComponent,
		UtilImageEditorComponent,
		UtilImageComponent
	]
})
export class UtilImageModule {}
