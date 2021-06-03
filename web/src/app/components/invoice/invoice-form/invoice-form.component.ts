import { Component, OnInit, Input } from "@angular/core";
import {
	Currency,
	Project,
	Account,
	InvoiceItem,
	Invoice,
} from "src/app/models";
import { FormGroup, FormArray, FormBuilder } from "@angular/forms";
import { AppService } from "src/app/app.service";
import { FormMode } from "src/app/types";
import { InvoiceItemForm } from "./invoice-item.form";

@Component({
	selector: "app-invoice-form",
	templateUrl: "./invoice-form.component.html",
	styles: [],
})
export class InvoiceFormComponent implements OnInit {
	@Input() form: FormGroup;
	@Input() mode: FormMode;
	@Input() invoice: Invoice;
	currencies: Currency[];
	projects: Project[];
	accounts: Account[];

	constructor(protected service: AppService, protected fb: FormBuilder) {}

	get items() {
		return <FormArray>this.form.get("items");
	}

	ngOnInit() {
		this.service.account
			.getCurrencies()
			.subscribe((data) => (this.currencies = data));

		this.service.account
			.getAccounts()
			.subscribe((data) => (this.accounts = data));

		this.service.project.getProgressProjects().subscribe((data) => {
			this.projects = data;

			if (this.invoice && this.invoice.project) {
				this.projects.push(this.invoice.project);
			}
		});

		if (!this.form.value.advance) {
			this.form.controls.advPmtDate.disable();
		}

		this.form.controls.advance.valueChanges.subscribe((value) => {
			if (value) {
				this.form.controls.advPmtDate.enable();
			} else {
				this.form.controls.advPmtDate.disable();
			}
		});

		if (this.mode == "create") {
			this.form.controls.advance.setValue(0);
			this.form.controls.proforma.setValue(0);
			this.form.controls.pmtDate.setValue("");
			this.form.controls.issueDate.setValue(new Date());
			this.addItem();
		} else {
			this.form.controls.proforma.disable();
		}
	}

	addItem() {
		const group = this.fb.group(new InvoiceItemForm(new InvoiceItem()));
		this.items.push(group);
		group.controls.qty.setValue(1);
	}

	deleteItem(i: number) {
		this.items.removeAt(i);
	}
}
