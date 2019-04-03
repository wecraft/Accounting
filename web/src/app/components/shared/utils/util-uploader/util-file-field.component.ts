import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
	selector: "util-file-field",
	templateUrl: "./util-file-field.component.html",
	exportAs: "utilFileField"
})
export class UtilFileFieldComponent {
	fileName: string;

	@Input() form: FormGroup;
	@Input("controlName") formControlName: string;
	@Input() accept: string;
	@Output() onSelectFile = new EventEmitter<File>();
	constructor() {}

	ngOnInit() {}

	_onSelectFile(file: File) {
		if (this.form) {
			this.form.controls[this.formControlName].setValue(file);
		}

		this.fileName = file.name;

		this.onSelectFile.next(file);
	}
}
