import { Component, OnInit, Input } from "@angular/core";
import {
	FormArray,
	FormGroup,
	FormControlDirective,
	FormControl
} from "@angular/forms";
import { UserPieForm } from "../user-pie.form";

@Component({
	selector: "app-user-pie-form",
	templateUrl: "./user-pie-form.component.html",
	styles: []
})
export class UserPieFormComponent implements OnInit {
	@Input() form: FormGroup;

	blockedIndex: number;

	constructor() {}

	ngOnInit() {
		const pies = this.form.get("pies") as FormArray;

		pies.controls.forEach((group: FormGroup, index) => {
			const otherGroupIndex = index == 0 ? 1 : 0;
			const otherGroup = pies.controls[otherGroupIndex];

			group.controls.amount.valueChanges.subscribe(value => {
				if (this.blockedIndex != index) {
					this.blockedIndex = otherGroupIndex;
					otherGroup["controls"]["amount"].setValue(100 - value);
					this.blockedIndex = null;
				}
			});
		});
	}

	toIndex(index: number) {
		const pies = this.form.get("pies") as FormArray;

		pies.controls[index]["controls"]["amount"].setValue(100);
	}

	toDefault() {
		const pies = this.form.get("pies") as FormArray;

		pies.controls[0]["controls"]["amount"].setValue(50);
	}
}
