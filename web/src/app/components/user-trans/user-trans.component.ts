import { Component, OnInit, Inject } from "@angular/core";
import { UserTrans } from "src/app/models";
import { FormGroup, FormBuilder } from "@angular/forms";
import { FormModel } from "../shared/form/form.model";
import { AppService } from "src/app/app.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UserTransForm } from "./user-trans-form/user-trans.form";
import { FormMode } from "src/app/types";

@Component({
	selector: "app-user-trans",
	templateUrl: "./user-trans.component.html",
	styles: []
})
export class UserTransComponent implements OnInit {
	userTrans: UserTrans;
	form: FormGroup;
	formModel: FormModel;
	mode: FormMode;

	constructor(
		protected service: AppService,
		protected fb: FormBuilder,
		public dialogRef: MatDialogRef<UserTransComponent>,
		@Inject(MAT_DIALOG_DATA)
		public data: {
			userTransId?: number;
			onDelete?: () => {};
		}
	) {}

	ngOnInit() {
		this.mode = this.data.userTransId ? "update" : "create";

		if (this.mode == "update") {
			this.service.transaction
				.getUserTrans(this.data.userTransId, {
					include: "user1,user2,currency"
				})
				.subscribe(data => {
					this.userTrans = data;

					this.createForm();
				});
		} else {
			this.createForm();
		}
	}

	createForm() {
		if (this.userTrans) {
			this.form = this.fb.group(new UserTransForm(this.userTrans));
		} else {
			this.form = this.fb.group(new UserTransForm(new UserTrans()));
		}

		this.formModel = new FormModel({
			service: this.service,
			form: this.form,
			action: (data: FormData) => {
				return this.mode == "create"
					? this.service.transaction.createUserTrans(data)
					: this.service.transaction.updateUserTrans(
							this.userTrans.id,
							data
					  );
			},
			onSuccess: data => {
				if (this.mode == "create") {
					this.dialogRef.close(true);
				} else {
					this.userTrans = data;
					this.dialogRef.close(data);
				}
			}
		});
	}

	deleteTrans() {
		this.service.delete(
			this.service.transaction.deleteUserTrans(this.userTrans.id),
			{
				text: `Are you sure you want to delete User Transfer #${
					this.userTrans.id
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
