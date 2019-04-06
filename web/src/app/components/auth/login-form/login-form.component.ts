import { Component, OnInit } from "@angular/core";
import { FormComponent } from "../../shared/form/form-component";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AppService } from "../../../app.service";
import { Observable } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Toast } from "../../toast/toast";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material";
import { FormModel } from "../../shared/form/form.model";

@Component({
	selector: "app-login-form",
	templateUrl: "./login-form.component.html",
	styles: []
})
export class LoginFormComponent implements OnInit {
	form = this.fb.group({
		email: "",
		password: ""
	});

	formModel: FormModel;

	constructor(
		protected fb: FormBuilder,
		protected service: AppService,
		private route: ActivatedRoute,
		public dialog: MatDialog
	) {}

	ngOnInit() {
		this.formModel = new FormModel({
			service: this.service,
			form: this.form,
			action: (data: FormData) => {
				return this.service.auth.login(data);
			},
			onSuccess: (token: string) => {
				localStorage.setItem("authUser", token);
				this.service.router.navigate([this.service.auth.redirectUrl]);
				this.service.auth.redirectUrl = "/";
			},
			onError(err: HttpErrorResponse) {
				if (err.status == 403) {
					this.service.toast(
						new Toast("invalid_credentials", "danger")
					);
				}
			}
		});
	}
}
