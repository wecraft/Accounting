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
		console.log(this.form.value);
		console.log(this.control.value);
	}
}
