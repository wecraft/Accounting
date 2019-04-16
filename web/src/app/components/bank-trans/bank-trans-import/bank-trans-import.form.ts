import { FormArray } from "@angular/forms";

export class BankTransImportForm {
	orders = new FormArray([]);
	transfers = new FormArray([]);
}
