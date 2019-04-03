import { Component } from "@angular/core";
import { AppService } from "../../app.service";

@Component({
	template: ""
})
export class LogoutComponent {
	constructor(private service: AppService) {}

	ngOnInit() {
		this.service.auth.logout();
	}
}
