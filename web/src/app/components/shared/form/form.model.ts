import { AppService } from "src/app/app.service";
import { FormError } from "./form-error";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Toast } from "../../toast/toast";

export class FormModel {
	loading: boolean;
	formData: FormData = new FormData();
	formErrors: FormError[] = [];

	constructor(
		private options: {
			service: AppService;
			form: FormGroup;
			action: (data: FormData) => Observable<any>;
			onSend?: () => any;
			onResponse?: () => void;
			onSuccess?: (data: any) => void;
			onError?: (err: HttpErrorResponse) => void;
			toast?: Toast;
			errorToast?: Toast;
		}
	) {}

	createFormData(
		object: Object,
		form?: FormData,
		_namespace?: string
	): FormData {
		const formData = form || new FormData();
		for (let property in object) {
			if (!object.hasOwnProperty(property)) {
				continue;
			}
			const formKey = _namespace
				? `${_namespace}[${property}]`
				: property;
			if (object[property] instanceof Date) {
				formData.append(formKey, object[property].toISOString());
			} else if (
				typeof object[property] === "object" &&
				!(object[property] instanceof File)
			) {
				this.createFormData(object[property], formData, formKey);
			} else {
				let formValue = object[property];

				if (formValue === false) {
					formValue = 0;
				} else if (formValue === true) {
					formValue = 1;
				}

				formData.append(formKey, formValue);
			}
		}
		return formData;
	}

	submit() {
		if (!this.loading) {
			this.loading = true;
			this.formToData();

			let send = this.options.onSend ? this.options.onSend() : true;

			if (send !== false) {
				this.options.service.submit(
					this.options.action(this.formData),
					res => {
						this.loading = false;
						this.formErrors = [];
						if (this.options.onResponse) {
							this.options.onResponse();
						}
						if (this.options.onSuccess) {
							this.options.onSuccess(res);
						}

						if (this.options.toast) {
							this.options.service.toast(this.options.toast);
						}
					},
					(err: HttpErrorResponse, errorObj: FormError[]) => {
						this.loading = false;
						if (this.options.onResponse) {
							this.options.onResponse();
						}
						if (this.options.onError) {
							this.options.onError(err);
						}
						this.formErrors = errorObj;

						if (this.options.errorToast) {
							this.options.service.toast(this.options.errorToast);
						}
					}
				);
			}
		}
	}

	formToData() {
		this.formData = this.createFormData(this.options.form.getRawValue());
	}
}
