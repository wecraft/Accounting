import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Observable, BehaviorSubject } from "rxjs";
import { FormError } from "./components/shared/form/form-error";
import { EmitterService } from "./components/shared/broadcast/emitter.service";
import { Toast } from "./components/toast/toast";

@Injectable()
export class AppService {
	//Cache authUser
	private _preloaderState: boolean;
	preloaderStateSubject: BehaviorSubject<boolean> = new BehaviorSubject(
		false
	);

	get preloaderState() {
		return this._preloaderState;
	}

	set preloaderState(value: boolean) {
		this._preloaderState = value;

		this.preloaderStateSubject.next(value);
	}

	constructor(
		public router: Router,
		public http: HttpClient,
		public emitter: EmitterService,
		public auth: AuthService
	) {}

	parseErrors(error: HttpErrorResponse) {
		const status = error.status;
		if (status == 422) {
			const body = error.error.errors;
			let errors: FormError[] = [];
			if (body) {
				for (let controlName in body) {
					let errorItem = new FormError();
					errorItem.controlName = controlName;
					errorItem.errors = [];
					for (let errorKey in body[controlName]) {
						errorItem.errors.push({
							key: errorKey,
							message: body[controlName][errorKey]
						});
					}
					errors.push(errorItem);
				}
			}
			return errors;
		}
		return [];
	}

	submit(
		endPoint: Observable<any>,
		success?: (res) => void,
		error?: (error: HttpErrorResponse, errorObj?: FormError[]) => void,
		showError: boolean = true
	) {
		this.preloaderState = true;
		endPoint.subscribe(
			res => {
				this.preloaderState = false;
				if (success) {
					success(res);
				}
			},
			(err: HttpErrorResponse) => {
				this.preloaderState = false;
				let errorObj = this.parseErrors(err);
				if (error) {
					error(err, errorObj);
				}
			}
		);
	}

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

	confirm(type: string, onConfirm = () => {}, data: any = {}) {
		this.emitter.emit("confirm-dialog", {
			type: type,
			onConfirm: onConfirm,
			data: data
		});
	}

	toast(toast: Toast) {
		this.emitter.emit("show-toast", toast);
	}

	delete(
		endpoint: Observable<any>,
		confirm: { type: string; data?: any; onConfirm?: (data?: any) => void },
		toast?: Toast
	) {
		this.confirm(
			confirm.type,
			() => {
				this.submit(endpoint, (data: any) => {
					if (confirm.onConfirm) {
						confirm.onConfirm(data);
					}
					if (toast) {
						this.toast(toast);
					}
				});
			},
			confirm.data
		);
	}
}
