import { Component, Input, OnChanges } from "@angular/core";
import { FormError } from "./form-error";

@Component({
	selector: "app-input-error",
	templateUrl: "input-error.component.html"
})
export class InputErrorComponent implements OnChanges {
	@Input() errors: FormError[];
	@Input() control: string;

	error: FormError = new FormError();

	constructor() {}

	ngOnChanges() {
		this.error =
			this.errors.filter(item => item.controlName == this.control)[0] ||
			new FormError();
	}
}
