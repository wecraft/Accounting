import { Component, OnInit, Input } from "@angular/core";
import { Currency, Client } from "src/app/models";
import { FormGroup } from "@angular/forms";
import { AppService } from "src/app/app.service";

@Component({
	selector: "app-project-form",
	templateUrl: "./project-form.component.html",
	styles: []
})
export class ProjectFormComponent implements OnInit {
	@Input() form: FormGroup;
	currencies: Currency[];
	clients: Client[];
	completed: boolean;

	constructor(protected service: AppService) {}

	ngOnInit() {
		this.service.account
			.getCurrencies()
			.subscribe(data => (this.currencies = data));

		this.service.client
			.getClients()
			.subscribe(data => (this.clients = data));

		this.completed = this.form.value.status == "completed";
	}

	onChangeStatus(val: boolean) {
		const status: string = val ? "completed" : "progress";

		this.form.controls.status.setValue(status);
	}
}
