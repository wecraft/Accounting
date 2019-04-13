import { Component, OnInit, Inject } from "@angular/core";
import { AccountTrans } from "src/app/models";
import { FormGroup, FormBuilder } from "@angular/forms";
import { FormModel } from "../shared/form/form.model";
import { AppService } from "src/app/app.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AccountTransForm } from "./account-trans-form/account-trans.form";

@Component({
	selector: "app-account-trans",
	templateUrl: "./account-trans.component.html",
	styles: []
})
export class AccountTransComponent implements OnInit {
	accountTrans: AccountTrans;
	form: FormGroup;
	formModel: FormModel;

	constructor(
		protected service: AppService,
		protected fb: FormBuilder,
		public dialogRef: MatDialogRef<AccountTransComponent>,
		@Inject(MAT_DIALOG_DATA)
		public data: {
			accountTransId: number;
		}
	) {}

	ngOnInit() {
		this.service.transaction
			.getAccountTrans(this.data.accountTransId, {
				include: "account1,currency1,account2,currency2"
			})
			.subscribe(data => {
				this.accountTrans = data;

				this.createForm();
			});
	}

	createForm() {
		this.form = this.fb.group(new AccountTransForm(this.accountTrans));

		this.formModel = new FormModel({
			service: this.service,
			form: this.form,
			action: (data: FormData) => {
				return this.service.transaction.updateAccountTrans(
					this.accountTrans.id,
					data
				);
			},
			onSuccess: data => {
				this.accountTrans = data;

				this.dialogRef.close(data);
			}
		});
	}
}
