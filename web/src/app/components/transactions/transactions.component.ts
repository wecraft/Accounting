import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTabNav } from "@angular/material";

@Component({
	selector: "app-transactions",
	templateUrl: "./transactions.component.html",
	styles: []
})
export class TransactionsComponent implements OnInit {
	links = [
		{
			route: "bank",
			label: "Bank"
		},
		{
			route: "account",
			label: "Accounts"
		},
		{
			route: "user",
			label: "Users"
		}
	];

	constructor() {}

	ngOnInit() {}

	activeLink = "account";
}
