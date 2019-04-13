import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Currency } from "src/app/models";
import { AppService } from "src/app/app.service";

@Component({
	selector: "app-user-trans-form",
	templateUrl: "./user-trans-form.component.html",
	styles: []
})
export class UserTransFormComponent implements OnInit {
	@Input() form: FormGroup;
	currencies: Currency[];

	constructor(protected service: AppService) {}

	ngOnInit() {
		this.service.account
			.getCurrencies()
			.subscribe(data => (this.currencies = data));
	}

	selectUser(id: number) {
		const otherId = id == 1 ? 2 : 1;
		this.form.controls.user1.setValue(id);
		this.form.controls.user2.setValue(otherId);
	}
}
