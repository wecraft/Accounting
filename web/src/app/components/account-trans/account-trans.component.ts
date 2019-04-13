import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { AccountTrans } from "src/app/models";
import { FormGroup, FormBuilder } from "@angular/forms";
import { FormModel } from "../shared/form/form.model";
import { AppService } from "src/app/app.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AccountTransForm } from "./account-trans-form/account-trans.form";
import { FormMode } from "src/app/types";
import { AccountTransGroupFormComponent } from "./account-trans-group-form/account-trans-group-form.component";
import { AccountTransGroupForm } from "./account-trans-group-form/account-trans-group.form";

@Component({
	selector: "app-account-trans",
	templateUrl: "./account-trans.component.html",
	styles: []
})
export class AccountTransComponent implements OnInit {
	@ViewChild("accountTransGroupForm")
	accountTransGroupForm: AccountTransGroupFormComponent;

	accountTrans: AccountTrans;
	form: FormGroup;
	formModel: FormModel;
	mode: FormMode;

	constructor(
		protected service: AppService,
		protected fb: FormBuilder,
		public dialogRef: MatDialogRef<AccountTransComponent>,
		@Inject(MAT_DIALOG_DATA)
		public data: {
			accountTransId?: number;
			onDelete?: () => {};
		}
	) {}

	ngOnInit() {
		this.mode = this.data.accountTransId ? "update" : "create";

		if (this.mode == "update") {
			this.service.transaction
				.getAccountTrans(this.data.accountTransId, {
					include: "account1,currency1,account2,currency2"
				})
				.subscribe(data => {
					this.accountTrans = data;

					this.createForm();
				});
		} else {
			this.createForm();
		}
	}

	createForm() {
		if (this.accountTrans) {
			this.form = this.fb.group(new AccountTransForm(this.accountTrans));
		} else {
			this.form = this.fb.group(new AccountTransGroupForm());
		}

		this.formModel = new FormModel({
			service: this.service,
			form: this.form,
			action: (data: FormData) => {
				return this.mode == "create"
					? this.service.transaction.createAccountTrans(data)
					: this.service.transaction.updateAccountTrans(
							this.accountTrans.id,
							data
					  );
			},
			onSuccess: data => {
				if (this.mode == "create") {
					this.dialogRef.close(true);
				} else {
					this.accountTrans = data;

					this.dialogRef.close(data);
				}
			}
		});
	}

	deleteTrans() {
		this.service.delete(
			this.service.transaction.deleteAccountTrans(this.accountTrans.id),
			{
				text: `Are you sure you want to delete Account Transfer #${
					this.accountTrans.id
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
