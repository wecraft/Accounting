import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { AccountFormComponent } from "./account-form.component";
import { AccountIconModule } from "../account-icon/account-icon.module";

@NgModule({
	imports: [SharedModule, AccountIconModule],
	declarations: [AccountFormComponent],
	exports: [AccountFormComponent]
})
export class AccountFormModule {}
