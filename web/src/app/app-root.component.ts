import { Component, ViewChild } from "@angular/core";
import { AuthenticableComponent } from "./components/shared/extends/AuthenticableComponent";
import { AppService } from "./app.service";
import { TopicEvent } from "./components/shared/models/topic-event";
import { MatDialog } from "@angular/material";
import { ConfirmComponent } from "./components/confirm/confirm.component";
import { MaterialDialogConfig } from "./globals/material-dialog-config";
import { Toast } from "./components/toast/toast";
import { ToastComponent } from "./components/toast/toast.component";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
	selector: "app-root",
	templateUrl: "./app-root.component.html"
})
export class AppRootComponent extends AuthenticableComponent {
	toast: Toast = new Toast("changes_saved");

	preloaderState: boolean;
	preloaderStateSubject: Subscription;

	@ViewChild("toastRef")
	toastRef: ToastComponent;

	constructor(
		service: AppService,
		private dialog: MatDialog,
		private route: ActivatedRoute
	) {
		super(service);
	}

	ngOnInit() {
		super.ngOnInit();

		this.preloaderStateSubject = this.service.preloaderStateSubject.subscribe(
			value => {
				setTimeout(() => {
					this.preloaderState = value;
				});
			}
		);
	}

	ngOnDestroy() {
		super.ngOnDestroy();

		if (this.preloaderStateSubject) {
			this.preloaderStateSubject.unsubscribe();
		}
	}

	onChangeUser() {}

	ngAfterViewInit() {}

	onEvent(event: TopicEvent) {
		switch (event.topic) {
			case "confirm-dialog":
				this.dialog.open(
					ConfirmComponent,
					new MaterialDialogConfig(event.data, "480px")
				);
				break;
			case "show-toast":
				this.toast = event.data;
				setTimeout(() => {
					this.toastRef.show();
				}, 10);
				break;
		}
	}
}
