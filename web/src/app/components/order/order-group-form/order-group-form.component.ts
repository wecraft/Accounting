import { Component, OnInit, Input } from "@angular/core";
import {
	FormGroup,
	FormArray,
	FormBuilder,
	FormControl,
	Form
} from "@angular/forms";
import { OrderForm } from "../order-form/order.form";
import { AppService } from "src/app/app.service";
import { UserPie, Order } from "src/app/models";
import { UserPieForm } from "../../user/user-pie.form";

@Component({
	selector: "app-order-group-form",
	exportAs: "orderGroupForm",
	templateUrl: "./order-group-form.component.html",
	styles: []
})
export class OrderGroupFormComponent implements OnInit {
	@Input() form: FormGroup;

	get orders() {
		return <FormArray>this.form.get("orders");
	}

	constructor(protected service: AppService, protected fb: FormBuilder) {}

	ngOnInit() {
		if (this.orders.length == 0) {
			this.addOrder();
		}
	}

	addOrder() {
		const orders = this.form.get("orders") as FormArray;
		const group = this.fb.group(new OrderForm(new Order()));

		this.setPies(group);
		this.setDefaults(group);

		orders.push(group);
	}

	deleteOrder(i: number) {
		this.orders.removeAt(i);
	}

	setPies(group: FormGroup) {
		const pies = group.get("pies") as FormArray;

		for (let i of [1, 2]) {
			const userPie: UserPie = new UserPie(+i, 50);

			pies.push(this.fb.group(new UserPieForm(userPie)));
		}
	}

	setDefaults(group: FormGroup) {
		group.controls.type.setValue("cost");
		group.controls.vat.setValue(0);
		group.controls.tax.setValue(0);
		group.controls.currency.setValue(2);
		group.controls.account.setValue(1);
		group.controls.date.setValue(new Date());
		group.controls.desc.setValue("");
	}
}
