import { Component, Input } from "@angular/core";

import { UtilImageEditorComponent } from "./util-image-editor.component";
import { AppImage } from "../../models/image";
import { AppService } from "../../../../app.service";
import { FormGroup } from "@angular/forms";

@Component({
	exportAs: "utilImage",
	selector: "util-image",
	templateUrl: "./util-image.component.html"
})
export class UtilImageComponent {
	@Input()
	label: string;
	@Input()
	image: AppImage;
	@Input()
	form: FormGroup;
	@Input("controlName")
	formControlName: string;
	@Input()
	editorClass: string = "avatar-mode";

	meta: any;
	removeValue: boolean;

	constructor(private service: AppService) {}

	onFileSelect(file: AppImage) {
		// console.log(file);
		this.image = file;
		this.updateForm();
	}

	remove() {
		this.removeValue = true;
		this.image = null;
		this.updateForm();
	}

	onChangeImage(meta: any) {
		// console.log(meta);
		this.meta = meta;
		this.updateForm();
	}

	private updateForm() {
		const mainValue = this.image && this.image.file ? this.image.file : "";
		const metaValue = this.meta;
		const removeValue = this.removeValue;

		if (this.form) {
			const mainControl = this.form.controls[
				this.formControlName + "File"
			];
			const metaControl = this.form.controls[
				this.formControlName + "Meta"
			];
			const removeControl = this.form.controls[
				this.formControlName + "Remove"
			];
			mainControl.setValue(mainValue);
			metaControl.setValue(metaValue);
			removeControl.setValue(removeValue);
		}

		this.removeValue = false;
	}
}
