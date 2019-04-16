import { FormControl } from "@angular/forms";
import { InvoiceItem } from "src/app/models";

export class InvoiceItemForm {
	descBg = new FormControl();
	descEn = new FormControl();
	amount = new FormControl();
	qty = new FormControl();

	constructor(item: InvoiceItem) {
		this.descBg.setValue(item.descBg);
		this.descEn.setValue(item.descEn);
		this.amount.setValue(item.amount);
		this.qty.setValue(item.qty);
	}
}
