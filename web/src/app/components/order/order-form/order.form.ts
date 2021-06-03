import { FormControl, FormArray } from "@angular/forms";
import { Order } from "src/app/models";

export class OrderForm {
	amount = new FormControl();
	date = new FormControl();
	desc = new FormControl();
	tax = new FormControl();
	vat = new FormControl();
	other = new FormControl();

	currency = new FormControl();
	account = new FormControl();
	category = new FormControl();
	invoices = new FormControl();
	projects = new FormControl();
	type = new FormControl();

	files = new FormControl();
	deletedFiles = new FormControl();

	pies = new FormArray([]);

	include = new FormControl("account,currency,projects,invoices,pies,files");

	constructor(order: Order) {
		this.amount.setValue(order.amount);
		if (order.date) {
			this.date.setValue(new Date(order.date));
		} else {
			this.date.setValue(new Date());
		}
		this.desc.setValue(order.desc);
		this.tax.setValue(order.tax);
		this.vat.setValue(order.vat);
		this.type.setValue(order.type);
		this.other.setValue(order.other);

		if (order.currency) {
			this.currency.setValue(order.currency.id);
		}
		if (order.account) {
			this.account.setValue(order.account.id);
		}
		if (order.category) {
			this.category.setValue(order.category.id);
		} else {
			this.category.setValue(27);
		}

		if (order.invoices) {
			this.invoices.setValue(order.invoices.map((item) => item.id));
		}
		if (order.projects) {
			this.projects.setValue(order.projects.map((item) => item.id));
		}
	}
}
