import { FormControl, FormArray } from "@angular/forms";
import { Project } from "src/app/models";

export class ProjectForm {
	name = new FormControl();
	price = new FormControl();
	status = new FormControl();

	currency = new FormControl();
	client = new FormControl();

	pies = new FormArray([]);

	include = new FormControl("currency,client,pies,orders");

	constructor(project: Project) {
		this.name.setValue(project.name);
		this.price.setValue(project.price);
		this.status.setValue(project.status);

		if (project.currency) {
			this.currency.setValue(project.currency.id);
		}
		if (project.client) {
			this.client.setValue(project.client.id);
		}
	}
}
