import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Country } from "src/app/models";
import { AppService } from "src/app/app.service";

@Component({
	selector: "app-client-form",
	templateUrl: "./client-form.component.html",
	styles: []
})
export class ClientFormComponent implements OnInit {
	@Input() form: FormGroup;
	countries: Country[];

	constructor(protected service: AppService) {}

	ngOnInit() {
		this.service.getCountries().subscribe(data => (this.countries = data));
	}
}
