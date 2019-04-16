import { Component, OnInit, Inject } from "@angular/core";
import { Invoice, InvoiceItem } from "src/app/models";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { FormModel } from "../shared/form/form.model";
import { FormMode } from "src/app/types";
import { AppService } from "src/app/app.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { InvoiceForm } from "./invoice-form/invoice.form";
import { InvoiceItemForm } from "./invoice-form/invoice-item.form";

@Component({
	selector: "app-invoice",
	templateUrl: "./invoice.component.html",
	styles: []
})
export class InvoiceComponent implements OnInit {
	invoice: Invoice;
	form: FormGroup;
	formModel: FormModel;
	mode: FormMode;

	constructor(
		protected service: AppService,
		protected fb: FormBuilder,
		public dialogRef: MatDialogRef<InvoiceComponent>,
		@Inject(MAT_DIALOG_DATA)
		public data: {
			invoiceId?: number;
			onDelete?: () => {};
		}
	) {}

	ngOnInit() {
		this.mode = this.data.invoiceId ? "update" : "create";

		if (this.mode == "update") {
			this.service.invoice
				.getInvoice(this.data.invoiceId, {
					include: "currency,account,project,items"
				})
				.subscribe(data => {
					this.invoice = data;

					this.createForm();
				});
		} else {
			this.createForm();
		}
	}

	createForm() {
		if (this.invoice) {
			this.form = this.fb.group(new InvoiceForm(this.invoice));
		} else {
			this.form = this.fb.group(new InvoiceForm(new Invoice()));
		}

		const items = this.form.get("items") as FormArray;

		if (this.invoice) {
			this.invoice.items.forEach(item => {
				items.push(this.fb.group(new InvoiceItemForm(item)));
			});
		} else {
		}

		this.formModel = new FormModel({
			service: this.service,
			form: this.form,
			action: (data: FormData) => {
				return this.mode == "create"
					? this.service.invoice.createInvoice(data)
					: this.service.invoice.updateInvoice(this.invoice.id, data);
			},
			onSuccess: data => {
				if (this.mode == "create") {
					this.dialogRef.close(true);
				} else {
					this.invoice = data;

					this.dialogRef.close(data);
				}
			}
		});
	}

	deleteInvoice() {
		this.service.delete(
			this.service.invoice.deleteInvoice(this.invoice.id),
			{
				text: `Are you sure you want to delete Invoice #${
					this.invoice.invoiceNumber
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

	viewPdf(type: "original" | "copy") {
		if (this.invoice) {
			this.service.invoice
				.getInvoicePdf(this.invoice.id, {
					responseType: type
				})
				.subscribe(data => {
					const fileURL = URL.createObjectURL(data);
					window.open(fileURL, "_blank");
				});
		} else {
			const data = this.formModel.createFormData(this.form.value);
			this.service.invoice
				.getNewInvoicePdf(type, data)
				.subscribe(data => {
					const fileURL = URL.createObjectURL(data);
					window.open(fileURL, "_blank");
				});
		}
	}
}
