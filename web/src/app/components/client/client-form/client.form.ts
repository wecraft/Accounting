import { FormControl } from "@angular/forms";
import { Client } from "src/app/models";

export class ClientForm {
	name = new FormControl();
	eik = new FormControl();
	mol = new FormControl();
	email = new FormControl();
	city = new FormControl();
	address = new FormControl();
	postCode = new FormControl();
	company = new FormControl();
	vat = new FormControl();

	country = new FormControl();

	include = new FormControl("country");

	constructor(client: Client) {
		this.name.setValue(client.name);
		this.eik.setValue(client.eik);
		this.mol.setValue(client.mol);
		this.email.setValue(client.email);
		this.city.setValue(client.city);
		this.address.setValue(client.address);
		this.postCode.setValue(client.postCode);
		this.company.setValue(client.company);
		this.vat.setValue(client.vat);

		if (client.country) {
			this.country.setValue(client.country.id);
		}
	}
}
