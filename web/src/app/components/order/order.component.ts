import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Order, UserPie } from "src/app/models";
import { AppService } from "src/app/app.service";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { OrderForm } from "./order-form/order.form";
import { UserPieForm } from "../user/user-pie.form";
import { FormModel } from "../shared/form/form.model";

@Component({
	selector: "app-order",
	templateUrl: "./order.component.html",
	styles: []
})
export class OrderComponent implements OnInit {
	order: Order;
	form: FormGroup;
	formModel: FormModel;

	constructor(
		protected service: AppService,
		protected fb: FormBuilder,
		public dialogRef: MatDialogRef<OrderComponent>,
		@Inject(MAT_DIALOG_DATA)
		public data: {
			orderId: number;
		}
	) {}

	ngOnInit() {
		this.service.transaction
			.getOrder(this.data.orderId, {
				include: "account,currency,projects,invoices,pies"
			})
			.subscribe(data => {
				this.order = data;

				this.createForm();
			});
	}

	createForm() {
		this.form = this.fb.group(new OrderForm(this.order));
		const pies = this.form.get("pies") as FormArray;

		for (let i of [1, 2]) {
			const userPie: UserPie =
				this.order.pies.find(item => item.userId == +i) ||
				new UserPie(+1, 0);

			pies.push(this.fb.group(new UserPieForm(userPie)));
		}

		this.formModel = new FormModel({
			service: this.service,
			form: this.form,
			action: (data: FormData) => {
				return this.service.transaction.updateOrder(
					this.order.id,
					data
				);
			},
			onSuccess: data => {
				this.order = data;

				this.dialogRef.close(data);
			}
		});
	}
}
