import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Account } from "src/app/models";
import { AppService } from "src/app/app.service";

@Component({
	selector: "app-account-form",
	templateUrl: "./account-form.component.html",
	styles: []
})
export class AccountFormComponent implements OnInit {
	@Input() form: FormGroup;
	@Input() name: string;
	@Input() currencyControlName: string;
	accounts: Account[];
	control: any;

	constructor(protected service: AppService) {}

	ngOnInit() {
		this.service.account
			.getAccounts()
			.subscribe(data => (this.accounts = data));
		this.control = this.form.controls[this.name];
	}

	onClick(account: Account) {
		this.control.setValue(account.id);

		if (this.currencyControlName) {
			this.form.controls[this.currencyControlName].setValue(
				account.defCurrency
			);
		}
	}
}
