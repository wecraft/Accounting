import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Currency, Project } from "src/app/models";
import { AppService } from "src/app/app.service";

@Component({
	selector: "app-order-form",
	templateUrl: "./order-form.component.html",
	styles: []
})
export class OrderFormComponent implements OnInit {
	@Input() form: FormGroup;
	currencies: Currency[];
	projects: Project[];

	constructor(protected service: AppService) {}

	ngOnInit() {
		this.service.account
			.getCurrencies()
			.subscribe(data => (this.currencies = data));

		this.service.project
			.getProgressProjects()
			.subscribe(data => (this.projects = data));
	}

	changeType() {
		let current = this.form.value.type;
		let newVal = current == "cost" ? "income" : "cost";

		this.form.controls.type.setValue(newVal);
	}
}
