import { NgModule } from "@angular/core";
import { AccountIconComponent } from "./account-icon.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
	imports: [SharedModule],
	declarations: [AccountIconComponent],
	exports: [AccountIconComponent]
})
export class AccountIconModule {}
