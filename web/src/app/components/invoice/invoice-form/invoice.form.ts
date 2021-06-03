import { FormControl, FormArray } from "@angular/forms";
import { Project, Invoice } from "src/app/models";

export class InvoiceForm {
	advance = new FormControl();
	proforma = new FormControl();
	issueDate = new FormControl();
	dueDate = new FormControl();
	pmtDate = new FormControl();
	advPmtDate = new FormControl();

	currency = new FormControl();
	project = new FormControl();
	account = new FormControl();

	items = new FormArray([]);

	include = new FormControl("currency,project,account,items");

	constructor(invoice: Invoice) {
		if (invoice) {
			this.advance.setValue(invoice.advance);
			this.proforma.setValue(invoice.proforma);
			if (invoice.issueDate) {
				this.issueDate.setValue(new Date(invoice.issueDate));
			}
			if (invoice.dueDate) {
				this.dueDate.setValue(new Date(invoice.dueDate));
			}
			if (invoice.advPmtDate) {
				this.advPmtDate.setValue(new Date(invoice.advPmtDate));
			}
			this.pmtDate.setValue(invoice.pmtDate);

			if (invoice.currency) {
				this.currency.setValue(invoice.currency.id);
			}
			if (invoice.project) {
				this.project.setValue(invoice.project.id);
			}
			if (invoice.account) {
				this.account.setValue(invoice.account.id);
			}
		}
	}
}
