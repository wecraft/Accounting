import { AppRootComponent } from "./app-root.component";
import { NgModule } from "@angular/core";
import { SharedModule } from "./components/shared/shared.module";
import { MatProgressBarModule, MatToolbarModule } from "@angular/material";
import { ConfirmModule } from "./components/confirm/confirm.module";
import { ToastModule } from "./components/toast/toast.module";

@NgModule({
	imports: [
		SharedModule,
		MatProgressBarModule,
		ConfirmModule,
		ToastModule,
		MatToolbarModule
	],
	declarations: [AppRootComponent]
})
export class AppRootModule {}
