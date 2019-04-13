import { Component, OnInit, Inject } from "@angular/core";
import { UserTrans } from "src/app/models";
import { FormGroup, FormBuilder } from "@angular/forms";
import { FormModel } from "../shared/form/form.model";
import { AppService } from "src/app/app.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UserTransForm } from "./user-trans-form/user-trans.form";

@Component({
	selector: "app-user-trans",
	templateUrl: "./user-trans.component.html",
	styles: []
})
export class UserTransComponent implements OnInit {
	userTrans: UserTrans;
	form: FormGroup;
	formModel: FormModel;

	constructor(
		protected service: AppService,
		protected fb: FormBuilder,
		public dialogRef: MatDialogRef<UserTransComponent>,
		@Inject(MAT_DIALOG_DATA)
		public data: {
			userTransId: number;
		}
	) {}

	ngOnInit() {
		this.service.transaction
			.getUserTrans(this.data.userTransId, {
				include: "user1,user2,currency"
			})
			.subscribe(data => {
				this.userTrans = data;

				this.createForm();
			});
	}

	createForm() {
		this.form = this.fb.group(new UserTransForm(this.userTrans));

		this.formModel = new FormModel({
			service: this.service,
			form: this.form,
			action: (data: FormData) => {
				return this.service.transaction.updateUserTrans(
					this.userTrans.id,
					data
				);
			},
			onSuccess: data => {
				this.userTrans = data;

				this.dialogRef.close(data);
			}
		});
	}
}
