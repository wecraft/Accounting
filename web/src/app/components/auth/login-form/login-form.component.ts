import { Component, OnInit } from "@angular/core";
import { FormComponent } from "../../shared/form/form-component";
import { FormBuilder } from "@angular/forms";
import { AppService } from "../../../app.service";
import { Observable } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Toast } from "../../toast/toast";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material";

@Component({
	selector: "app-login-form",
	templateUrl: "./login-form.component.html",
	styles: []
})
export class LoginFormComponent extends FormComponent implements OnInit {
	form = this.fb.group({
		email: "",
		password: ""
	});

	constructor(
		protected fb: FormBuilder,
		protected service: AppService,
		private route: ActivatedRoute,
		public dialog: MatDialog
	) {
		super(fb, service);
	}

	action(data: FormData): Observable<any> {
		return this.service.auth.login(data);
	}

	ngOnInit() {}

	onSuccess(token: string) {
		localStorage.setItem("authUser", token);
		this.service.router.navigate([this.service.auth.redirectUrl]);
		this.service.auth.redirectUrl = "/";
	}

	onError(err: HttpErrorResponse) {
		if (err.status == 403) {
			this.service.toast(new Toast("invalid_credentials", "danger"));
		}
	}
}
