import {
	FormBuilder,
	FormGroup,
	AbstractControl,
	AbstractControlDirective,
	AbstractFormGroupDirective
} from "@angular/forms";
import { Observable } from "rxjs";

import { AppService } from "../../../app.service";
import { HttpErrorResponse } from "@angular/common/http";
import { FormError } from "./form-error";
import {
	OnInit,
	OnChanges,
	SimpleChanges,
	Input,
	Output,
	EventEmitter
} from "@angular/core";
import { FormModelMap } from "./form-model-map";
import { FormPrivacyMap, FormPrivacyMapItem } from "./form-privacy-map";
import { Toast } from "../../toast/toast";

export abstract class FormComponent implements OnChanges {
	@Input()
	model: any;
	@Output()
	success = new EventEmitter();

	form: FormGroup;
	abstract action(data: FormData): Observable<any>;

	loading: boolean;
	formData: FormData = new FormData();
	formErrors: FormError[] = [];
	toast: Toast;
	errorToast: Toast;
	mode: string = "create";

	formModelMap: FormModelMap;
	formPrivacyMap: FormPrivacyMap;

	constructor(protected fb: FormBuilder, protected service: AppService) {}

	ngOnInit() {
		this.build();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes["model"]) {
			setTimeout(() => {
				this.mode = this.model ? "update" : "create";
				this.rebuild();
			});
		}
	}

	build() {
		this.formBuildMapping();
		this.rebuild();
	}

	rebuild() {
		if (this.form) {
			this.formModelMapping();
			this.onRebuild();
		}
	}

	submit() {
		if (!this.loading) {
			this.loading = true;
			this.formToData();
			let send = this.onSend();
			if (send !== false) {
				this.service.submit(
					this.action(this.formData),
					res => {
						this.loading = false;
						this.formErrors = [];
						this.onResponse();
						this.onSuccess(res);

						if (this.toast) {
							this.service.toast(this.toast);
						}
					},
					(err: HttpErrorResponse, errorObj: FormError[]) => {
						this.loading = false;
						this.onResponse();
						this.onError(err);
						this.formErrors = errorObj;

						if (this.errorToast) {
							this.service.toast(this.errorToast);
						}
					}
				);
			}
		}
	}

	formToData() {
		this.formData = this.service.createFormData(this.form.getRawValue());
	}

	formBuildMapping() {
		if (this.formModelMap) {
			let options = {};
			this.singleFormBuildMapping(this.formModelMap, options);
			this.form = this.fb.group(options);
		}
	}

	singleFormBuildMapping(map: FormModelMap, options) {
		let relationName = map.name;
		let group: FormGroup;
		if (map.multiple) {
			options[relationName] = this.fb.array([]);
		} else {
			if (relationName) {
				group = map.model
					? this.fb.group(new map.model())
					: this.fb.group(this.getSingleMapOptions(map));
				options[relationName] = group;
			} else {
				this.getSingleMapOptions(map, null, options);
			}
		}
		if (map.children) {
			map.children.forEach((child: FormModelMap) => {
				this.singleFormBuildMapping(child, options);
			});
		}
	}

	formModelMapping() {
		this.form.reset();
		if (this.formModelMap) {
			this.singleFormModelMapping(
				this.formModelMap,
				this.form,
				this.model
			);
		}
	}

	singleFormModelMapping(map: FormModelMap, form: FormGroup, data: any) {
		if (data) {
			let relationName = map.name;
			let controlData = data[relationName] || data;
			let group: FormGroup;
			let groups: FormGroup[];

			if (map.multiple) {
				groups = controlData.map(item =>
					this.fb.group(this.getSingleMapOptions(map, item))
				);

				form.setControl(relationName, this.fb.array(groups));
			} else {
				if (relationName) {
					group = map.model
						? this.fb.group(controlData)
						: this.fb.group(
								this.getSingleMapOptions(map, controlData)
						  );
					form.setControl(relationName, group);
				} else {
					form.patchValue(this.getSingleMapOptions(map, controlData));
				}
			}
			if (map.children) {
				map.children.forEach((child: FormModelMap) => {
					this.singleFormModelMapping(
						child,
						form,
						this.model[child.name]
					);
				});
			}
		}
	}

	getSingleMapOptions(map: FormModelMap, data?: any, _options: any = {}) {
		let options = _options || {};

		if (map.model) {
			options = data;
		}
		if (map.fillable) {
			map.fillable.forEach((value: string) => {
				options[value] = data && data[value] ? data[value] : "";
			});
		}
		if (map.singleRelations) {
			map.singleRelations.forEach((value: string) => {
				options[value] =
					data && data[value] && data[value].id
						? +data[value].id
						: "";
			});
		}
		if (map.multipleRelations) {
			map.multipleRelations.forEach((value: string) => {
				options[value] = data ? data[value].map(item => +item.id) : "";
			});
		}
		return options;
	}

	extractPrivacyMap() {
		this.formPrivacyMap.items.forEach((item: FormPrivacyMapItem) => {
			this.formModelMap.fillable.push(item.key);
		});
	}

	onSend() {
		return true;
	}
	onSuccess(res: any) {
		this.success.next(res);
	}
	onError(err: HttpErrorResponse) {}
	onResponse() {}
	onRebuild() {}
}
