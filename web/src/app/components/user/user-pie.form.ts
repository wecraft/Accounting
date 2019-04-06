import { FormControl } from "@angular/forms";
import { UserPie } from "src/app/models";

export class UserPieForm {
	userId = new FormControl();
	amount = new FormControl();

	constructor(userPie: UserPie) {
		this.userId.setValue(userPie.userId);
		this.amount.setValue(userPie.amount);
	}
}
