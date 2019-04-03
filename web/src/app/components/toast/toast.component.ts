import { Component, OnInit, Input } from "@angular/core";
import { Toast } from "./toast";

@Component({
	selector: "app-toast",
	templateUrl: "./toast.component.html",
	exportAs: "appToast"
})
export class ToastComponent implements OnInit {
	@Input()
	toast: Toast = new Toast("");

	timeout = null;

	active: boolean;

	constructor() {}

	ngOnInit() {}

	show() {
		this.timeout = clearTimeout(this.timeout);

		this.active = true;

		this.timeout = setTimeout(() => {
			this.active = false;
		}, this.toast.timeout);
	}
}
