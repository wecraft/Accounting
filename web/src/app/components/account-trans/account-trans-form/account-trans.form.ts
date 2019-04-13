import { FormControl } from "@angular/forms";
import { AccountTrans } from "src/app/models";

export class AccountTransForm {
	amount1 = new FormControl();
	amount2 = new FormControl();
	date = new FormControl();

	account1 = new FormControl();
	account2 = new FormControl();
	currency1 = new FormControl();
	currency2 = new FormControl();

	include = new FormControl("account1,account2,currency1,currency2");

	constructor(accountTrans: AccountTrans) {
		this.amount1.setValue(accountTrans.amount1);
		this.amount2.setValue(accountTrans.amount2);
		this.date.setValue(new Date(accountTrans.date));

		if (accountTrans.currency1) {
			this.currency1.setValue(accountTrans.currency1.id);
		}
		if (accountTrans.currency2) {
			this.currency2.setValue(accountTrans.currency2.id);
		}
		if (accountTrans.account1) {
			this.account1.setValue(accountTrans.account1.id);
		}
		if (accountTrans.account2) {
			this.account2.setValue(accountTrans.account2.id);
		}
	}
}
