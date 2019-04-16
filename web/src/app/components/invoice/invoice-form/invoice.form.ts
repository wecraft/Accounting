import { FormControl, FormArray } from "@angular/forms";
import { Project, Invoice } from "src/app/models";

export class InvoiceForm {
	advance = new FormControl();
	proforma = new FormControl();
	issueDate = new FormControl();
	pmtDate = new FormControl();
	advPmtDate = new FormControl();

	currency = new FormControl();
	project = new FormControl();
	account = new FormControl();

	items = new FormArray([]);

	include = new FormControl("currency,project,account,items");

	constructor(invoice: Invoice) {
		this.advance.setValue(invoice.advance);
		this.proforma.setValue(invoice.proforma);
		this.issueDate.setValue(invoice.issueDate);
		this.pmtDate.setValue(invoice.pmtDate);
		this.advPmtDate.setValue(invoice.advPmtDate);

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
