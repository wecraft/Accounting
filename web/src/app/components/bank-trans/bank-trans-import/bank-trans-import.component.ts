import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { FormModel } from "../../shared/form/form.model";
import { AppService } from "src/app/app.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import {
	BankImport,
	UserPie,
	Currency,
	Project,
	Account
} from "src/app/models";
import { BankTransImportForm } from "./bank-trans-import.form";
import { OrderForm } from "../../order/order-form/order.form";
import { AccountTransForm } from "../../account-trans/account-trans-form/account-trans.form";
import { UserPieForm } from "../../user/user-pie.form";

@Component({
	selector: "app-bank-trans-import",
	templateUrl: "./bank-trans-import.component.html",
	styles: []
})
export class BankTransImportComponent implements OnInit {
	form: FormGroup;
	formModel: FormModel;

	currencies: Currency[];
	projects: Project[];
	accounts: Account[];

	constructor(
		protected service: AppService,
		protected fb: FormBuilder,
		public dialogRef: MatDialogRef<BankTransImportComponent>,
		@Inject(MAT_DIALOG_DATA)
		public data: {
			data: BankImport;
		}
	) {}

	get orders() {
		return <FormArray>this.form.get("orders");
	}
	get transfers() {
		return <FormArray>this.form.get("transfers");
	}

	ngOnInit() {
		this.service.project.getProgressProjects().subscribe(data => {
			this.projects = data;
			this.createForm();
		});
		this.service.account.getAccounts().subscribe(data => {
			this.accounts = data;
			this.createForm();
		});
		this.service.account.getCurrencies().subscribe(data => {
			this.currencies = data;
			this.createForm();
		});
	}

	createForm() {
		if (!(this.projects && this.currencies && this.accounts)) {
			return;
		}

		this.form = this.fb.group(new BankTransImportForm());

		this.data.data.orders.forEach(order => {
			const group = this.fb.group(new OrderForm(order));

			const pies = group.get("pies") as FormArray;

			for (let i of [1, 2]) {
				const userPie: UserPie = new UserPie(+i, 50);

				pies.push(this.fb.group(new UserPieForm(userPie)));
			}

			this.orders.push(group);
		});

		this.data.data.transfers.forEach(trans => {
			this.transfers.push(this.fb.group(new AccountTransForm(trans)));
		});

		this.formModel = new FormModel({
			service: this.service,
			form: this.form,
			action: (data: FormData) => {
				return this.service.transaction.saveBankImport(data);
			},
			onSuccess: data => {
				this.dialogRef.close(true);
			}
		});
	}
}
