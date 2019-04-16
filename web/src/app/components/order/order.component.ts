import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Order, UserPie } from "src/app/models";
import { AppService } from "src/app/app.service";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { OrderForm } from "./order-form/order.form";
import { UserPieForm } from "../user/user-pie.form";
import { FormModel } from "../shared/form/form.model";
import { FormMode } from "src/app/types";
import { OrderGroupForm } from "./order-group-form/order-group.form";
import { OrderGroupFormComponent } from "./order-group-form/order-group-form.component";

@Component({
	selector: "app-order",
	templateUrl: "./order.component.html",
	styles: []
})
export class OrderComponent implements OnInit {
	@ViewChild("orderGroupForm") orderGroupForm: OrderGroupFormComponent;

	order: Order;
	form: FormGroup;
	formModel: FormModel;
	mode: FormMode;

	constructor(
		protected service: AppService,
		protected fb: FormBuilder,
		public dialogRef: MatDialogRef<OrderComponent>,
		@Inject(MAT_DIALOG_DATA)
		public data: {
			orderId?: number;
			onDelete?: () => {};
		}
	) {}

	ngOnInit() {
		this.mode = this.data.orderId ? "update" : "create";

		if (this.mode == "update") {
			this.service.transaction
				.getOrder(this.data.orderId, {
					include: "account,currency,projects,invoices,pies,files"
				})
				.subscribe(data => {
					this.order = data;

					this.createForm();
				});
		} else {
			this.createForm();
		}
	}

	createForm() {
		if (this.order) {
			this.form = this.fb.group(new OrderForm(this.order));

			this.setPies();
		} else {
			this.form = this.fb.group(new OrderGroupForm());
		}

		this.formModel = new FormModel({
			service: this.service,
			form: this.form,
			action: (data: FormData) => {
				return this.mode == "create"
					? this.service.transaction.createOrder(data)
					: this.service.transaction.updateOrder(this.order.id, data);
			},
			onSuccess: data => {
				if (this.mode == "create") {
					this.dialogRef.close(true);
				} else {
					this.order = data;

					this.dialogRef.close(data);
				}
			}
		});
	}

	setPies() {
		const pies = this.form.get("pies") as FormArray;

		for (let i of [1, 2]) {
			const userPie: UserPie =
				this.order.pies.find(item => item.userId == +i) ||
				new UserPie(+i, 0);

			pies.push(this.fb.group(new UserPieForm(userPie)));
		}
	}

	deleteOrder() {
		this.service.delete(
			this.service.transaction.deleteOrder(this.order.id),
			{
				text: `Are you sure you want to delete Order #${
					this.order.id
				}?`,
				onConfirm: () => {
					this.dialogRef.close();

					if (this.data.onDelete) {
						this.data.onDelete();
					}
				}
			}
		);
	}
}
