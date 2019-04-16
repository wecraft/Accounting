import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Currency, Project, Order, AppFile } from "src/app/models";
import { AppService } from "src/app/app.service";

@Component({
	selector: "app-order-form",
	templateUrl: "./order-form.component.html",
	styles: []
})
export class OrderFormComponent implements OnInit {
	@Input() form: FormGroup;
	@Input() order: Order;
	currencies: Currency[];
	projects: Project[];

	constructor(protected service: AppService) {}

	ngOnInit() {
		this.service.account
			.getCurrencies()
			.subscribe(data => (this.currencies = data));

		this.service.project.getProgressProjects().subscribe(data => {
			this.projects = data;

			if (this.order.projects) {
				this.projects.push(...this.order.projects);
			}
		});

		this.form.controls.files.setValue([[]]);
		this.form.controls.deletedFiles.setValue([[]]);
	}

	changeType() {
		let current = this.form.value.type;
		let newVal = current == "cost" ? "income" : "cost";

		this.form.controls.type.setValue(newVal);
	}

	upload(files: File[]) {
		const current = this.form.controls.files.value;

		current.push(...files);
	}

	removeFile(i: number) {
		let files: File[] = this.form.controls.files.value;

		files = files.slice(i, 1);

		this.form.controls.files.setValue(files);
	}

	removeAppFile(file: AppFile) {
		const current = this.form.controls.deletedFiles.value;

		current.push(file.id);

		this.order.files = this.order.files
			.filter(item => item.id != file.id)
			.slice();
	}
}
