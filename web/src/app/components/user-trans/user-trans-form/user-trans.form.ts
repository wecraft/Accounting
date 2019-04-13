import { FormControl } from "@angular/forms";
import { UserTrans } from "src/app/models";

export class UserTransForm {
	amount = new FormControl();
	desc = new FormControl();

	user1 = new FormControl();
	user2 = new FormControl();
	currency = new FormControl();

	include = new FormControl("user1,user2,currency");

	constructor(userTrans: UserTrans) {
		this.amount.setValue(userTrans.amount);
		this.desc.setValue(userTrans.desc);

		if (userTrans.currency) {
			this.currency.setValue(userTrans.currency.id);
		}
		if (userTrans.user1) {
			this.user1.setValue(userTrans.user1.id);
		}
		if (userTrans.user2) {
			this.user2.setValue(userTrans.user2.id);
		}
	}
}
