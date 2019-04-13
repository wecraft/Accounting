import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormArray, FormBuilder } from "@angular/forms";
import { AppService } from "src/app/app.service";
import { AccountTransForm } from "../account-trans-form/account-trans.form";
import { AccountTrans } from "src/app/models";

@Component({
	selector: "app-account-trans-group-form",
	exportAs: "accountTransGroupForm",
	templateUrl: "./account-trans-group-form.component.html",
	styles: []
})
export class AccountTransGroupFormComponent implements OnInit {
	@Input() form: FormGroup;

	get transactions() {
		return <FormArray>this.form.get("transactions");
	}

	constructor(protected service: AppService, protected fb: FormBuilder) {}

	ngOnInit() {
		if (this.transactions.length == 0) {
			this.addTransaction();
		}
	}

	addTransaction() {
		const transactions = this.form.get("transactions") as FormArray;
		const group = this.fb.group(new AccountTransForm(new AccountTrans()));

		this.setDefaults(group);

		transactions.push(group);
	}

	deleteTransaction(i: number) {
		this.transactions.removeAt(i);
	}

	setDefaults(group: FormGroup) {
		group.controls.account1.setValue(2);
		group.controls.currency1.setValue(3);
		group.controls.account2.setValue(1);
		group.controls.currency2.setValue(2);
	}
}
