import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Currency } from "src/app/models";
import { AppService } from "src/app/app.service";

@Component({
	selector: "app-account-trans-form",
	templateUrl: "./account-trans-form.component.html",
	styles: []
})
export class AccountTransFormComponent implements OnInit {
	@Input() form: FormGroup;
	currencies: Currency[];

	constructor(protected service: AppService) {}

	ngOnInit() {
		console.log(this.form);
		this.service.account
			.getCurrencies()
			.subscribe(data => (this.currencies = data));
	}
}
