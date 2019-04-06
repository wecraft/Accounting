import { Component, OnInit, Input } from "@angular/core";
import { Account } from "src/app/models";
import { AccountIconSize } from "src/app/types";

@Component({
	selector: "app-account-icon",
	templateUrl: "./account-icon.component.html",
	styles: []
})
export class AccountIconComponent implements OnInit {
	@Input() account: Account;
	@Input() size: AccountIconSize = "small";

	classSize: string;

	constructor() {}

	ngOnInit() {
		this.classSize = this.size;
	}
}
